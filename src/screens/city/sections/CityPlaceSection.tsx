import { useSelectedCity } from '@/hooks/city/useSelectedCity';
import useAppRouting from '@/hooks/navigation/useAppRouting';

import PlaceList from '@/components/list/place/PlaceList';

import ScreenSection from '@/layout/ScreenSection';

const CityPlaceSection = () => {
  const route = useAppRouting<'CityDetail'>();
  const { id } = route.params;

  const {
    state: { item },
  } = useSelectedCity({ id });

  return (
    <ScreenSection header='Places'>
      {!!item && <PlaceList item={item} />}
    </ScreenSection>
  );
};

export default CityPlaceSection;
