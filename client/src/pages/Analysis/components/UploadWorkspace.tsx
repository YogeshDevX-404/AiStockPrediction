import React, { useState, useEffect, useRef } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { useImageAnalysisStore } from '@/store/useImageAnalysisStore';
import { useVisionStore } from '@/store/useVisionStore';
import { Upload, Image as ImageIcon, ZoomIn, ZoomOut, RotateCw, Trash2, Eye, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const UploadWorkspace: React.FC = () => {
  const { uploadedImagePreview, setUploadedImagePreview, runAnalysis, isAnalyzing } = useImageAnalysisStore();
  const { zoomLevel, setZoomLevel, rotation, setRotation, resetControls } = useVisionStore();

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Paste from clipboard event listener (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            readAndPreviewFile(blob);
            toast.success('Pasted chart screenshot from clipboard!');
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const readAndPreviewFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setUploadedImagePreview(base64);
      resetControls();
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      readAndPreviewFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      readAndPreviewFile(e.target.files[0]);
    }
  };

  const handleExecuteScan = async () => {
    if (!uploadedImagePreview) return;
    toast.loading('Analyzing screenshot chart via Neural Vision AI...', { id: 'vision-scan' });
    await runAnalysis('user_chart_screenshot.png', uploadedImagePreview);
    toast.success('AI Vision Chart Analysis Complete!', { id: 'vision-scan' });
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <ImageIcon className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">AI Vision Upload & Workspace</h2>
        </div>
        <span className="text-xs text-slate-400 font-mono">Supports TradingView, Zerodha, Groww & Upstox Screenshots</span>
      </div>

      {!uploadedImagePreview ? (
        /* Drag & Drop Upload Zone */
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 ${
            dragActive
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/15 hover:border-purple-500/50 bg-white/5'
          }`}
        >
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/10">
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">Drag & Drop Chart Screenshot Here</h3>
            <p className="text-xs text-slate-400">or click to browse from device • Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Ctrl+V</kbd> to paste clipboard image</p>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>Supported Layouts:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">TradingView</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">Zerodha Kite</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">Groww</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">Upstox</span>
          </div>
        </div>
      ) : (
        /* Interactive Image Preview with Controls */
        <div className="space-y-4">
          <div className="relative rounded-2xl bg-black/60 overflow-hidden border border-white/10 max-h-[420px] flex items-center justify-center p-4">
            <img
              src={uploadedImagePreview}
              alt="Uploaded Chart Screenshot"
              style={{ transform: `scale(${zoomLevel}) rotate(${rotation}deg)` }}
              className="max-h-[380px] object-contain transition-transform duration-200 select-none"
            />

            {/* Toolbar overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass-panel px-3 py-1.5 rounded-2xl border border-white/10 flex items-center space-x-2 text-xs">
              <button onClick={() => setZoomLevel(zoomLevel + 0.2)} className="p-1 text-slate-300 hover:text-white cursor-pointer" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => setZoomLevel(zoomLevel - 0.2)} className="p-1 text-slate-300 hover:text-white cursor-pointer" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={() => setRotation((rotation + 90) % 360)} className="p-1 text-slate-300 hover:text-white cursor-pointer" title="Rotate">
                <RotateCw className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-white/20" />
              <button onClick={() => setUploadedImagePreview(null)} className="p-1 text-red-400 hover:text-red-300 cursor-pointer" title="Remove Screenshot">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setUploadedImagePreview(null)}>
              Replace Image
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={isAnalyzing}
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleExecuteScan}
            >
              Analyze Chart with Vision AI
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
