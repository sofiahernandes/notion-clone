import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";

const MarketingPage = () => {
  return (
    <div className="h-[86vh] flex flex-col dark:bg-secondary/70">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading/>
          <Heroes/>
          <Footer/>
      </div>
    </div>  
  );
};

export default MarketingPage;
