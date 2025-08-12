import { ScrollViewProps } from 'react-native';

const listDefaultProps = {
  bounces: false,
  bouncesZoom: false,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  alwaysBounceVertical: false,
  alwaysBounceHorizontal: false,
  onEndReachedThreshold: 0.333,
  maxToRenderPerBatch: 10,
  initialNumToRender: 10,
  updateCellsBatchingPeriod: 50,
  decelerationRate: 'fast',
  overScrollMode: 'never',
  scrollEventThrottle: 16,
} as ScrollViewProps;

export { listDefaultProps };
