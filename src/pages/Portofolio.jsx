import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import { PinContainer } from "../components/PinContainer";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Reorganized tech stacks with categories
const categorizedTechStacks = {
  "Programming Languages": [
    { icon: "python.svg", language: "Python" },
    { icon: "java.svg", language: "Java" },
    { icon: "c.svg", language: "C" },
    { icon: "c++.svg", language: "C++" },
    { icon: "C_sharp.svg", language: "C#" },
    { icon: "nim.svg", language: "Nim" },
    { icon: "kotlin.svg", language: "Kotlin" },
    { icon: "prolog.svg", language: "PROLOG" },
    { icon: "vb.svg", language: "Visual Basic" },
  ],
  "Frontend Development": [
    { icon: "html.svg", language: "HTML" },
    { icon: "css.svg", language: "CSS" },
    { icon: "javascript.svg", language: "JavaScript" },
    { icon: "tailwind.svg", language: "Tailwind CSS" },
    { icon: "reactjs.svg", language: "ReactJS" },
    { icon: "vite.svg", language: "Vite" },
    { icon: "vue.svg", language: "Vue JS" },
    { icon: "MUI.svg", language: "Material UI" },
    { icon: "gsap.svg", language: "GSAP" },
    { icon: "jquery.svg", language: "jQuery" },
    { icon: "bootstrap.svg", language: "Bootstrap" },
  ],
  "Backend Development": [
    { icon: "nodejs.svg", language: "Node JS" },
    { icon: "expressjs.svg", language: "express JS" },
    { icon: "Django.svg", language: "Django" },
    { icon: "php.svg", language: "php" },
    { icon: "wordpress.svg", language: "WordPress" },
  ],
  "Database & Cloud": [
    { icon: "firebase.svg", language: "Firebase" },
    { icon: "postgresql.svg", language: "Postgresql" },
  ],
  "AI & Machine Learning": [
    { icon: "tensorflow.svg", language: "Tensorflow" },
    { icon: "pytorch.svg", language: "PyTorch" },
    { icon: "scikit-learn.svg", language: "scikit learn" },
    { icon: "SageMaker.svg", language: "AmazonSagemaker" },
  ],
  "DevOps & Tools": [
    { icon: "gitlab.svg", language: "gitlab" },
    { icon: "docker.svg", language: "Docker" },
  ],
};

// Flattened tech stacks for backward compatibility if needed
const techStacks = Object.values(categorizedTechStacks).flat();

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const handleCategoryClick = (index) => {
    setActiveCategoryIndex(activeCategoryIndex === index ? null : index);
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="min-h-screen overflow-hidden" id="Portfolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-white max-w-2xl mx-auto text-sm md:text-base mt-2">
          Discover the milestones that define my growth — from innovative projects and technical skills to industry-recognized certifications. Each section reflects my ongoing pursuit of excellence in the tech world.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Technical Skills"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8 h-full">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="h-full"
                  >
                    <PinContainer
                      key={index}
                      title={project.name}
                      href={project.github || project.demo || "#"}
                      className="w-full h-full"
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        id={project.id}
                      />
                    </PinContainer>
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto overflow-hidden pb-[5%]">
              {/* Category navigation buttons */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center" data-aos="fade-down" data-aos-duration="800">
                {Object.keys(categorizedTechStacks).map((category, index) => (
                  <button 
                    key={category}
                    onClick={() => handleCategoryClick(index)}
                    className={`
                      px-4 py-2 rounded-xl text-sm md:text-base font-medium
                      transition-all duration-300
                      ${activeCategoryIndex === index 
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20" 
                        : "bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white hover:scale-105"}
                    `}
                  >
                    {category}
                  </button>
                ))}
                {activeCategoryIndex !== null && (
                  <button 
                    onClick={() => setActiveCategoryIndex(null)}
                    className="px-4 py-2 rounded-xl text-sm md:text-base font-medium
                      transition-all duration-300 bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  >
                    Show All
                  </button>
                )}
              </div>
              
              {/* Display all categories or just the active one */}
              {activeCategoryIndex === null ? (
                // Show all categories with headers
                <>
                  {Object.entries(categorizedTechStacks).map(([category, stacks], categoryIndex) => (
                    <div key={category} className="mb-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={categoryIndex * 100}>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 pl-2 border-l-4 border-purple-500">
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 gap-4">
                        {stacks.map((stack, index) => (
                          <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={(index % 6) * 100}
                          >
                            <TechStackIcon 
                              TechStackIcon={stack.icon} 
                              Language={stack.language}
                              category={category}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                // Show only the selected category
                <div data-aos="fade-up" data-aos-duration="1000">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 pl-2 border-l-4 border-purple-500">
                    {Object.keys(categorizedTechStacks)[activeCategoryIndex]}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6 gap-4">
                    {categorizedTechStacks[Object.keys(categorizedTechStacks)[activeCategoryIndex]].map((stack, index) => (
                      <div
                        key={index}
                        data-aos="zoom-in"
                        data-aos-duration="800"
                        data-aos-delay={index * 100}
                      >
                        <TechStackIcon 
                          TechStackIcon={stack.icon} 
                          Language={stack.language}
                          category={Object.keys(categorizedTechStacks)[activeCategoryIndex]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}