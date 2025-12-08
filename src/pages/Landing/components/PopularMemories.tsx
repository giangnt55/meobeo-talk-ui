import MemoryCard from "./MemoryCard";
import "../Landing.css";

const memories = [
  { icon: "school", date: "May 20, 2023", title: "Graduation Day!", description: "End of a chapter..." },
  { icon: "cake", date: "July 22, 2023", title: "Leo's First Birthday", description: "Time flies!" },
  { icon: "hiking", date: "Sep 5, 2023", title: "Sunrise Hike", description: "Worth waking up at 4AM." },
];

const PopularMemories = () => {
  return (
    <section className="memories-section">
      <h2 className="section-title">Popular Memories</h2>
      <p className="section-subtitle">A glimpse into moments we cherish.</p>

      <div className="memories-grid">
        {memories.map((m, i) => (
          <MemoryCard key={i} {...m} />
        ))}
      </div>
    </section>
  );
};

export default PopularMemories;
