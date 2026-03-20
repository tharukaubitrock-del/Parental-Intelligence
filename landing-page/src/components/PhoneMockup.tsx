import React from 'react';
import { IPhone15ProFrame } from './IPhone15ProFrame';
import { PiWelcomeScreen } from './PiWelcomeScreen';

export function PhoneMockup({ className }: { className?: string }) {
  return (
    <IPhone15ProFrame className={className} statusBar="light" contentClassName="">
      <PiWelcomeScreen />
    </IPhone15ProFrame>
  );
}
