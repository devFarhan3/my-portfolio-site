import { TestimonialsColumn } from "./testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "A Great Developer. I would highly recommend him every time for application development.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Mohit Kumar",
    role: "Junior PHP & Backend Developer",
  },
  {
    text: "Working with Farhan was truly amazing, he's quite professional guy and creative at the same time and suggests better design that leads to some eye catching product.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Shahrukh Akhter Siddiqui",
    role: "Software Engineer",
  },
  {
    text: "Very professional and very responsive. Loved working with him, he had considered and satisfied all my requirements, even though I made changes multiple times. Highly recommended.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    name: "Kamran Jawed",
    role: "Technical Sales Engineer",
  },
  {
    text: "I've had the pleasure of working with Farhan at ITVertical, and he is an outstanding UI/UX Frontend Engineer. His ability to create visually appealing, user-friendly interfaces and his expertise in modern frontend technologies make him a valuable asset to any team.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Faisal Tahir",
    role: "Team Lead (JS | React.js)",
  },
  {
    text: "Yes it was a good experience with Farhan. He is very professional in his work. Recommended 👍🏼",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Muhammad Arsalan",
    role: "Lead Generation Specialist",
  },
  {
    text: "Delivered quality project on time.",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    name: "Amjad Khatri",
    role: "Solution Expert",
  },
  {
    text: "Farhan Aslam is a very good web developer. He has a lot of knowledge about various things like UI/UX, design, etc. I really enjoyed working with him. He delivers projects on time.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    name: "Aqib Ehsan",
    role: ".NET Core Developer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 5);
const thirdColumn = testimonials.slice(5, 7);

export const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.1em] text-text-2 flex items-center gap-2">
              <span className="text-accent">●</span> Testimonials
            </p>
          </div>

          <h2 className="text-[40px] md:text-[62px] font-bold text-text-1 tracking-tight leading-[1.1]">
            What My <br />
            <span className="text-accent">Clients Say.</span>
          </h2>
          <p className="text-[19px] text-text-2 mt-8 leading-relaxed max-w-[500px] mx-auto">
            Real feedback from professionals and clients I've had the pleasure of working with.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
