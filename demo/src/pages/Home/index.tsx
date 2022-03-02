import PageHeader from './components/PageHeader';
import Hr from './components/Hr';
import AdjustableDemo from './components/AdjustableDemo';
import { RevealEffectConfig } from '../../RevealEffect';

export default () => (
  <>
    <RevealEffectConfig mountOnBody={false}><PageHeader /></RevealEffectConfig>
    <Hr />
    <RevealEffectConfig mountOnBody={false}><AdjustableDemo /></RevealEffectConfig>
    <Hr />
  </>
);
