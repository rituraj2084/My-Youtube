import React from 'react';
import Button from './Button';

const buttonList = [
  'All',
  'Gaming',
  'Music',
  'News',
  'Sports',
  'Travel',
  'Movies',
  'Live',
  'Cooking',
  'Romance',
  'Comedy',
];
const ButtonList = () => {
  return (
    <div className="flex">
      {buttonList.map((name) => (
        <Button key={name} name={name} />
      ))}
    </div>
  );
};

export default ButtonList;
