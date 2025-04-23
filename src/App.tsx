import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import memoryPhoto from "@/assets/qqq.png";

const MUSIC_PATH = '/windy.mp3';

const drawers = [
  {
    title: "第一层：写给妈妈的话",
    content: "亲爱的妈妈，谢谢你一直以来的付出与陪伴，希望这份特别的小惊喜能带给你快乐与感动。"
  },
  {
    title: "第二层：回忆照片",
    // 直接用 React 节点插入 <img>
    content: (
      <img
        src={memoryPhoto}
        alt="mom and me"
        className="rounded-xl shadow-md w-full"
      />
    )
  },
  {
    title: "第三层：今日祝福卡片",
    content: "愿你天天开心，岁岁平安，愿世界温柔待你，就像你一直温柔待我一样。"
  },
  {
    title: "第四层：神秘彩蛋",
    content: "快去客厅看看桌上的礼物盒吧！有一个真正的惊喜等着你哦～🎁"
  }
];

export default function DrawerGiftBox() {
  const [step, setStep] = useState(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    if (step < drawers.length) {
      setStep(step + 1);
    }
  };
  const handleRestart = () => {
    setStep(1);
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [step]);

  useEffect(() => {
    const audio = new Audio(MUSIC_PATH);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => { });
    return () => audio.pause();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6 animate-pulse">母亲节惊喜宝盒</h1>
      <div className="max-w-md w-full space-y-4 overflow-y-auto">
        {drawers.slice(0, step).map((drawer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{drawer.title}</h2>
                {/* 如果 content 是字符串，会直接渲染文本；如果是 React 节点，会直接渲染节点 */}
                {typeof drawer.content === "string"
                  ? <p>{drawer.content}</p>
                  : drawer.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {step < drawers.length ? (
          <Button onClick={handleNext} className="w-full mt-4 animate-bounce">打开下一层</Button>
        ) : (
          <div className="flex justify-between">
            <Button onClick={handleRestart} className="w-full mt-4 animate-bounce">重新开始</Button>
          </div>
        )}

        {/* 👇 滚动锚点，保证内容显示完整 */}
        <div ref={bottomRef} style={{ height: 1 }} />
      </div>
    </div>
  );
}
