import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const NetLogoSimulation = () => {
  const NET_LOGO_URL = "https://abm-covid-19.netlify.app";

  return (
    <Drawer>
      <DrawerTrigger className="fixed z-50 flex justify-center items-center gap-2 aspect-square h-16 w-16 bg-white shadow-xl rounded-full bottom-4 right-4 border border-gray-900/5 hover:shadow-2xl transition-all">
        <img
          src="https://netlogoweb.org/assets/images/netlogowebicon.png"
          alt="NetLogo"
          width="28"
          height="28"
        />
      </DrawerTrigger>
      <DrawerTrigger className="flex items-center justify-center gap-5 w-full py-2 border border-dashed rounded-2xl border-gray-900/30 bg-gray-50 hover:shadow-lg transition-all">
        <img
          src="https://netlogoweb.org/assets/images/netlogowebicon.png"
          alt="NetLogo"
          width="48"
          height="48"
        />
        <h1 className="text-2xl font-bold text-gray-900 not-prose">
          Open Simulation
        </h1>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] h-full w-full">
        <div className="flex flex-col w-full h-full gap-8 p-8 mx-auto max-w-7xl">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-bold text-purple-700 drop-shadow-sm">
              NetLogo Simulation
            </h2>
            <p>
              An agent-based model (ABM) of COVID-19 transmission in a
              population with vaccination effect.
            </p>
          </div>

          <div className="w-full h-full overflow-hidden border rounded-2xl shadow-sm aspect-video bg-gradient-to-b from-blue-600/20 via-white to-green-600/20 border-gray-900/10">
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
