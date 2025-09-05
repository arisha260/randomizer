type Segment = {
  text: string;
  angle: number;
  // rotation: number;
  color: string;
};

export const getWheelSegments = (list: string[]): Segment[] => {
  const angle = 360 / list.length;
  // const angleOffset = Math.floor(180 / list.length);
  return list.map((item, index) => ({
    text: item,
    angle: index * angle,
    // rotation: ((angle * index) * -1) - angleOffset,
    color: `hsl(${index * (360 / list.length)}, 70%, 50%)`
  }));
};
