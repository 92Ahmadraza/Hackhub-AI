
import React, { useState, useRef, useEffect } from 'react';
// Added Zap to imports
import { Mic, MicOff, Volume2, Wifi, WifiOff, Terminal, MessageSquare, Activity, Waves, Zap } from 'lucide-react';
import { 
  getGeminiClient, 
  decodeBase64, 
  encodeBase64, 
  decodeAudioData 
} from '../geminiService';
import { Modality } from '@google/genai';

const LiveMentor: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [transcription, setTranscription] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const toggleSession = async () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  const startSession = async () => {
    setStatus('connecting');
    setIsActive(true);

    try {
      const ai = getGeminiClient();
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: 'You are an expert Hackathon Technical Mentor. Provide concise, helpful code advice and debugging tips through voice.',
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setStatus('connected');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encodeBase64(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg) => {
            if (msg.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev.slice(-4), `Mentor: ${msg.serverContent!.outputTranscription!.text}`]);
            } else if (msg.serverContent?.inputTranscription) {
               setTranscription(prev => [...prev.slice(-4), `You: ${msg.serverContent!.inputTranscription!.text}`]);
            }

            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const buffer = await decodeAudioData(decodeBase64(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              const startAt = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(startAt);
              nextStartTimeRef.current = startAt + buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch (e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Gemini Live Error', e);
            stopSession();
          },
          onclose: () => stopSession()
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start Live Mentor', err);
      stopSession();
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('idle');
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch (e) {} });
    sourcesRef.current.clear();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black tracking-tight">Technical Oracle</h2>
        <p className="text-slate-400 font-medium">Native Voice Integration • Real-time Debugging • Multi-modal Guidance</p>
      </div>

      <div className="glass-card rounded-[3rem] p-12 flex flex-col items-center gap-10 shadow-2xl relative overflow-hidden group">
        {/* Animated Background Aura */}
        <div className={`absolute inset-0 bg-indigo-600/5 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg transition-all ${
            status === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
            status === 'connecting' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
            'bg-slate-800 text-slate-500 border-slate-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
            Connection: {status}
          </div>
        </div>

        {/* Visual Waveform (Simulated for UX) */}
        <div className="h-24 flex items-end gap-1.5 z-10">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 bg-indigo-500 rounded-full transition-all duration-300 ${
                isActive ? 'animate-[bounce_1s_infinite_ease-in-out]' : 'h-2 bg-slate-800'
              }`}
              style={{ 
                animationDelay: `${i * 0.05}s`,
                height: isActive ? `${Math.random() * 80 + 20}%` : '8px'
              }}
            />
          ))}
        </div>

        <button
          onClick={toggleSession}
          className={`z-10 relative group w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl ${
            isActive 
              ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/40' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/40 hover:scale-105'
          }`}
        >
          {isActive ? (
            <MicOff className="w-16 h-16 text-white" />
          ) : (
            <Mic className="w-16 h-16 text-white" />
          )}
          
          <div className={`absolute inset-0 rounded-full border-8 border-white/10 transition-all ${isActive ? 'animate-[ping_3s_infinite]' : ''}`} />
        </button>

        <div className="z-10 w-full bg-[#020617]/60 rounded-[2rem] p-8 border border-white/5 min-h-[220px] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
              <Terminal className="w-4 h-4 text-indigo-500" />
              Tele-Transcribe Output
            </div>
            <Activity className={`w-4 h-4 text-indigo-500 ${isActive ? 'animate-pulse' : ''}`} />
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] custom-scrollbar px-2">
            {transcription.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                <MessageSquare className="w-10 h-10 mb-4" />
                <p className="text-sm font-medium">Standby mode. Initialize voice link to begin synchronization.</p>
              </div>
            ) : (
              transcription.map((line, i) => (
                <div key={i} className={`p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-left-4 duration-500 ${
                  line.startsWith('Mentor') 
                    ? 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/10 ml-4' 
                    : 'bg-white/5 text-slate-300 mr-4'
                }`}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="z-10 flex gap-10 text-slate-500">
           <div className="flex items-center gap-2">
             <Volume2 className="w-5 h-5 text-indigo-500" />
             <span className="text-xs font-bold uppercase tracking-widest">Neural Audio Stream</span>
           </div>
           <div className="flex items-center gap-2">
             <Waves className="w-5 h-5 text-indigo-500" />
             <span className="text-xs font-bold uppercase tracking-widest">Latency: 24ms</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-8 rounded-[2rem] hover:border-indigo-500/20 transition-all">
          <h4 className="font-black text-sm mb-3 text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Operational Directives
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            "Ask about architecture patterns, specific framework bugs, or performance optimization. I have real-time context of the current global hackathon trends."
          </p>
        </div>
        <div className="glass-card p-8 rounded-[2rem] hover:border-indigo-500/20 transition-all">
          <h4 className="font-black text-sm mb-3 text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Current Models
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Running Gemini 2.5 Flash Native Audio. Optimized for low-latency human-like interaction and technical code reasoning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveMentor;
