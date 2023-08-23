import React from 'react';
import { BigHead } from '@bigheads/core';
import { Message } from '@/interfaces/Message';
import Markdown from 'markdown-to-jsx';

interface Props {
  message: Message;
}

export const BubbleMessage = ({ message }: Props) => {
  if (message.isBot) {
    return (
      <div key={message.id} className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-16 rounded-full">
            {/* <img src="https://www.pngplay.com/wp-content/uploads/13/Bot-Angry-Icon-PNG-HD-Quality.png" /> */}
            <BigHead
              accessory="none"
              body="breasts"
              circleColor="blue"
              clothing="vneck"
              clothingColor="blue"
              eyebrows="angry"
              eyes={message.bot?.eyes}
              faceMask={false}
              faceMaskColor="red"
              facialHair="none2"
              graphic="react"
              hair="buzz"
              hairColor="white"
              hat="none"
              hatColor="blue"
              lashes={false}
              lipColor="purple"
              mouth={message.bot?.mouth}
              skinTone="light"
            />
          </div>
        </div>
        <div className="chat-bubble">
          <Markdown>{message.text.trim()}</Markdown>
        </div>
      </div>
    );
  }
  return (
    <div key={message.id} className="chat chat-end">
      <div className="chat-bubble chat-bubble-accent">{message.text}</div>
    </div>
  );
};
