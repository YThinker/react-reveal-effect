import PageHeader from './components/PageHeader';
import Hr from './components/Hr';
import AdjustableDemo from './components/AdjustableDemo';
import Introduce from './components/Introduce';
import UsageDemo from './components/UsageDemo';
import Compatibility from './components/StartNow';
import Principle from './components/Principle';


const Home = () => {

  return (
    <>
      <PageHeader />
      <Hr />
      <AdjustableDemo />
      <Hr />
      <Introduce />
      <Hr />
      <UsageDemo />
      <Hr />
      <Principle />
      <Hr />
      <Compatibility />
    </>
  )
};

export default Home;