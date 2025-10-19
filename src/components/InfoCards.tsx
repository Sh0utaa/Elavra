import React from "react";
import { PLinkTile } from "@porsche-design-system/components-react";
import latestqna from "../public/assets/latest-qna.jpg";
import detailedsolution from "../public/assets/detailed-statistics.jpg";
import guaranteedsuccess from "../public/assets/guaranteed success.jpg";

const InfoCards: React.FC = () => {
  const cards = [
    {
      title: "Latest Q&A",
      imageUrl: latestqna,
      linkTo: "#",
    },
    {
      title: "Detailed Statistics",
      imageUrl: detailedsolution,
      linkTo: "#",
    },
    {
      title: "Guaranteed Success",
      imageUrl: guaranteedsuccess,
      linkTo: "#",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-center">
      {/* Cards */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-[225px] max-w-[350px] transition-all duration-300"
          >
            <PLinkTile
              href={c.linkTo}
              label={c.title}
              description={c.title}
              compact={true}
              size="inherit"
              style={{
                width: "100%",
                fontSize: "20px",
              }}
            >
              <img
                src={c.imageUrl}
                alt={c.title}
                className="w-full h-56 object-cover rounded-xl"
              />
            </PLinkTile>
          </div>
        ))}
      </div>

      <p className="text-gray-600 text-xs mt-8 max-w-3xl mx-auto text-center sm:text-left sm:max-w-1xl">
        Getting ready for the Georgian driver’s license theory exam? Start
        studying with Elvera — the smarter, simpler way to prepare. Why waste
        time and money going to physical classes when you can learn everything
        from home, at your own pace? Our online platform gives you the latest
        official questions and answers, detailed progress stats, and even AI
        assistance to help you stay on track. Don’t overpay for what you can do
        better with Elvera — learn smarter, save more, and pass with confidence.
      </p>
    </section>
  );
};

export default InfoCards;
