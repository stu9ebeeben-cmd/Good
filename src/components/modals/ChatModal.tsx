import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ChatModal: React.FC = () => {
  const { isChatOpen, closeChat, chatMessages, sendChatMessage } = useApp();
  const [inputVal, setInputVal] = useState('');

  if (!isChatOpen) return null;

  const quickPrompts = [
    '什么时候发货？',
    '四件套起球缩水吗？',
    '今天有什么满减券？',
    '3件19.9拼单怎么玩？',
  ];

  const handleSend = () => {
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9ff] flex flex-col max-w-md mx-auto animate-in fade-in">
      {/* Header */}
      <div className="h-14 px-3 bg-white flex items-center justify-between border-b border-slate-100 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={closeChat}
            className="w-9 h-9 flex items-center justify-center text-[#121c2a] hover:text-[#b22204]"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#121c2a]">聚惠商城官方客服</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-[10px] text-[#8f7069]">官方客服 · 在线服务中</span>
          </div>
        </div>

        <button
          onClick={closeChat}
          className="text-xs text-[#5b403b] hover:text-[#121c2a] px-2 py-1 rounded"
        >
          关闭
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#b22204] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-xs">
                  小聚
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#b22204] text-white rounded-br-xs'
                    : 'bg-white text-[#121c2a] border border-slate-100 rounded-bl-xs'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[9px] mt-1 text-right ${
                    isUser ? 'text-white/70' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts */}
      <div className="bg-white px-3 py-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendChatMessage(prompt)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#dee9fc] text-[10px] text-[#121c2a] transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 pb-safe">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="给客服发消息..."
          className="flex-1 h-10 px-3 bg-[#eff4ff] rounded-full text-xs text-[#121c2a] outline-none placeholder:text-[#8f7069]"
        />
        <button
          onClick={handleSend}
          className="h-10 px-4 rounded-full bg-[#b22204] text-white text-xs font-bold hover:bg-[#d63c1e] active:scale-95 transition-all shadow-xs flex items-center justify-center"
        >
          发送
        </button>
      </div>
    </div>
  );
};
