import React from "react";
import { PLinkTile } from "@porsche-design-system/components-react";
import latestqna from "../public/assets/latest-qna.jpg";
import detailedsolution from "../public/assets/detailed-statistics.jpg";
import guaranteedsuccess from "../public/assets/guaranteed success.jpg";

const InfoCards: React.FC = () => {
  const cards = [
    {
      title: "Latest questions and answers",
      imageUrl: latestqna,
      linkTo: "#",
    },
    {
      title: "Detailed Statistics",
      imageUrl: detailedsolution,
      linkTo: "#",
    },
    {
      title: "Guaranteed success",
      imageUrl: guaranteedsuccess,
      linkTo: "#",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((c, idx) => (
          <PLinkTile
            key={idx}
            href={c.linkTo}
            label={c.title}
            description=""
            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={c.imageUrl}
              alt={c.title}
              className="w-full h-56 object-cover"
            />
          </PLinkTile>
        ))}
      </div>

      <p className="text-left text-gray-600 mt-8 max-w-4md mx-auto">
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
