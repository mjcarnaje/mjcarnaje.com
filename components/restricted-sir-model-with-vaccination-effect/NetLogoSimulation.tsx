import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScatterChart } from "lucide-react";

const NetLogoSimulation = () => {
  const NET_LOGO_URL = "https://abm-covid-19.netlify.app";

  return (
    <Drawer>
      <DrawerTrigger className="fixed z-50 flex items-center gap-2 p-4 text-white bg-purple-500 rounded-full shadow-lg bottom-4 right-4">
        <ScatterChart className="w-8 h-8" /> Open NetLogo
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] h-full w-full">
        <div className="flex flex-col w-full gap-8 p-8 mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-purple-700 drop-shadow-sm">
            NetLogo Simulation
          </h2>
          <div className="w-full h-full overflow-hidden border rounded-lg shadow-sm aspect-video bg-gray-50 border-gray-900/10">
            <iframe
              src={NET_LOGO_URL}
              title="NetLogo simulation"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NetLogoSimulation;
