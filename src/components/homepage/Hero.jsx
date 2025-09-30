import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EventCard } from "../ui/GameCards/EventCard";  // ✅ Import EventCard
import { Ashpalt } from "../ui/Cards/Ashpalt";
import { Bgmi } from "../ui/Cards/Bgmi";
import { Codm } from "../ui/Cards/Codm";
import { Freefire } from "../ui/Cards/Freefire";
import { Valo } from "../ui/Cards/Valo";
import { GameCard } from "./GameCard";
import { NoticeCard } from "./NoticeCard";

export default function Hero({ name }) { // ✅ Destructured props
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/v1/tournament/getTournaments");

        
        if (response.status === 200 && response.data.success) {
          setEvents(response.data.data);
        }
      } catch (error) {
        // console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="no-scrollbar h-[90%] w-[90%]">
      {/* Greet */}
      <section>
        <div>
          <h1 className="uppercase font-bebas font-bold tracking-wide text-[3.5rem] leading-6 text-black">
            Welcome,
          </h1>
          <h1 className="uppercase font-bebas font-bold tracking-wide text-[3.5rem] text-white">
            {name} 
          </h1>
        </div>
      </section>

      {/* Board */}
      <section className="bg-[#151313e2] flex justify-between gap-4 px-1 pb-1 rounded-xl text-white font-bebas w-[70%] h-[38%]">
        <div className="flex flex-col h-[100%] w-[30%] items-center justify-start">
          <h1 className="uppercase font-bebas font-semibold tracking-wider text-xl py-2 text-white">
            Top Rated Series
          </h1>
          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-[100%] h-[40%] overflow-hidden rounded-lg hover:h-[55%] ease-in-out transition-all z-0">
              <img 
                className="-translate-y-12" 
                src="/svgviewer-png-output.png" // ✅ Fixed Image Path
                alt="Top Series"
              />
            </div>
            <h1 className="text-4xl font-semibold tracking-widest -mt-9 z-20">
              Night Hunter
            </h1>
            <h3 className="text-sm tracking-wide">
              We go live every day from 6 PM to noon!
            </h3>
          </div>
        </div>

        <div className="flex flex-col h-[100%] w-[70%] items-center">
          <h1 className="uppercase py-2 font-bebas font-semibold tracking-wider text-xl text-white">
            Choose your best match of series, among all games.
          </h1>
          <div className="h-[100%] w-[100%]  no-scrollbar overflow-y-scroll">
            {loading ? (
              <p className="text-white  text-center">Loading events...</p>
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  initialColor={event.initialColor || "#00AF60"}
                  viaColor={event.viaColor || "#B1E9D5"}
                  finalColor={event.finalColor || "#00FFA3"}
                  name={event.name}
                  mode={event.type}
                  slots={`${event.filledSlots || 0}/${event.totalSlots || 0}`}
                  date={event.date}
                  time={event.time}
                  pool={event.pool}
                  fee={event.fee} 
                  onClick={() => navigate(`/event/${event.id}`)}
                />
              ))
            ) : (
              <p className="text-white text-center">No events available</p>
            )}
          </div>
        </div>
      </section>

      {/* Card Section */}
      <section className="mt-4 h-[45%] w-[110%] no-scrollbar overflow-x-scroll">
        <div className="flex items-center h-[100%] justify-around w-[110%] overflow-hidden">
          <div onClick={() => navigate("/bgmipage")} className="p1"></div>
          <div className="p2"></div>
          <div className="p3"></div>
          <div className="p4"></div>
        </div>
      </section>
    </div>
  );
}
