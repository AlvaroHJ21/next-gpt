export type BotEye =
  | 'wink'
  | 'normal'
  | 'leftTwitch'
  | 'happy'
  | 'content'
  | 'squint'
  | 'simple'
  | 'dizzy'
  | 'heart'
  | undefined;

export type BotMouth = 'serious' | 'grin' | 'sad' | 'openSmile' | 'lips' | 'open' | 'tongue' | undefined;

export interface Message {
  id: number;
  text: string;
  isBot?: boolean;
  bot?: {
    mouth?: BotMouth;
    eyes?: BotEye;
  };
}
