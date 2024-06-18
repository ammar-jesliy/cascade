import Section from "./Section";
import InfoText from "./InfoText";
import Demo from "./Demo";
import taskDemo from "../assets/Create-task-demo.png";
import groupDemo from "../assets/group-demo.png";
import responsiveDemo from "../assets/responsive-demo.png";

const Info = () => {
  return (
    <Section id="info" className="mt-48 mb-16 flex flex-col gap-28">
      <div className="flex gap-10 flex-wrap md:justify-between md:flex-nowrap md:items-center">
        <InfoText
          heading="Task Creation and Organization"
          text="Effortlessly create, edit, and categorize your tasks to keep everything in order and easily accessible. Our intuitive interface allows you to add new tasks quickly, assign them to specific groups, and prioritize them based on importance."
        />
        <Demo image={taskDemo} />
      </div>

      <div className="flex gap-10 flex-wrap-reverse md:justify-between md:flex-nowrap">
        <Demo image={groupDemo} left={true}/>
        <InfoText
          heading="Group and Project Management"
          text="Organize tasks into groups or projects to better manage complex workflows and achieve your goals efficiently. Whether you're working on a personal project or collaborating with a team, our app provides robust tools to keep your tasks grouped logically."
        />
      </div>

      <div className="flex gap-10 flex-wrap md:justify-between md:flex-nowrap">
        <InfoText
          heading="Cross-Platform Access"
          text="Access your tasks from any device, ensuring you can stay productive on the go with our responsive design. Whether you're at your desk, using your smartphone, or working from a tablet, our platform adapts to your device for a seamless experience."
        />
        <Demo image={responsiveDemo} />
      </div>
    </Section>
  );
};

export default Info;
