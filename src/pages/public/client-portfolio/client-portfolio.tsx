import Typewriter from "typewriter-effect";

import {
  FaDownload,
  FaGithub,
  FaInstagramSquare,
  FaPhoneAlt,
  FaTelegram,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import "./client-portfolio.scss";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import request from "../../../server/request";
import { BASE, LIMIT } from "../../../components/cosnt";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { IoLogoVercel } from "react-icons/io5";
import Experience from "../../../components/cards/portfolio-experience";
import Education from "../../../components/cards/portfolio-education";
import Skill from "../../../components/cards/portfolio-skill";
import getImageURL from "../../../utils/get-image-url";
import Loading from "../../../components/loading";

import resume from "../../../../public/Resume Asilbek.pdf"
import UserType from "../../../types/user";



interface Date {
  startDate: string;
  endDate: string;
}

interface Props {
  experience: Date[];
  formatter: (value: number) => string;
}


const ClientPortfolioPage: React.FC<Props> = () => {
  
  const formatter = (value:number) => <CountUp end={value} separator="," />;

  const { userId } = useParams();

  console.log(userId);

  const [data, setData] = useState<UserType | null>(null);
  const [experience, setExperiences] = useState(null);
  const [portfolios, setPortfolios] = useState(null);
  const [education, setEducation] = useState(null);
  const [skills, setSkills] = useState(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getStudent = async () => {
      try {
        setLoading(true);
        const params = { limit: LIMIT };
        const { data } = await request(`users/${userId}`, { params });
        const {
          data: { data: expert },
        } = await request(`experiences?user=${userId}`);
        const {
          data: { data: port },
        } = await request(`portfolios?user=${userId}` , {params : {limit:50}});
        const {
          data: { data: edu },
        } = await request(`education?user=${userId}`);
        const {
          data: { data: skill },
        } = await request(`skills?user=${userId}`, { params: { limit: 50 } });
        console.log(data);
        console.log(expert);
        console.log(port);
        console.log(edu);
        console.log(skill);
        setData(data);
        setExperiences(expert);
        setPortfolios(port);
        setEducation(edu);
        setSkills(skill);
      } finally {
        setLoading(false);
      }
    };
    getStudent();
  }, [userId]);

  console.log;

  return (
    <Fragment>
      {loading? <Loading/> : <>
            <section style={{ paddingTop: 120, color: "white" }} id="hero">
            <div className="container hero-content">
              <div className="main-content">
                <div className="main-content-infos">
                  {data?.fields?.map((el) => (
                    <h3 key={el}>{el}</h3>
                  ))}
                  <h1>Hello I`m</h1>
                  <h1 className="name">
                    <Typewriter
                      options={{
                        strings: [
                          `${data?.firstName} ${data?.lastName}`,
                          "Junior Frontend Developer",
                        ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </h1>
                  <p>{data?.info}</p>
                  <div className="sends">
                    <a href={resume} download="Resume">
                    <button className="cv">
                      Download CV
                      <FaDownload />
                    </button>
                    </a>
                    <div className="medias">
                      <a href={data?.github}>
                        <FaGithub className="media-img" />
                      </a>
                      {/* <a href="#">
                        <FaLinkedinIn className="media-img" />
                      </a>
                      <a href="#">
                        <FaYoutube className="media-img" />
                      </a> */}
                      <a href={data?.instagram}>
                        <FaInstagramSquare className="media-img" />
                      </a>
                      <a href={data?.telegram}>
                        <FaTelegram className="media-img" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="main-content-img">
                  <div className="img"></div>
                  <img src={`${BASE}upload/${data?.photo}`} alt="" />
                  <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="statistics">
                <div className="statistics-title">
                  <Statistic
                    value={
                      experience?.map(
                        (el:string) => el.startDate.split("T")[0].split("-")[0]
                      ) -
                      experience?.map(
                        (el:string) => el.endDate.split("T")[0].split("-")[0]
                      )
                    }
                    formatter={formatter}
                  />
                  <p>Years of experience</p>
                </div>
                <div className="statistics-title">
                  <Statistic value={portfolios?.length} formatter={formatter} />
                  <p>Projects completed</p>
                </div>
                <div className="statistics-title">
                  <Statistic value={skills?.length} formatter={formatter} />
                  <p>Technologies mastered</p>
                </div>
                <div className="statistics-title">
                  <Statistic value={499} formatter={formatter} />
                  <p>Code commits</p>
                </div>
              </div>
            </div>
          </section>
          <section id="resume">
            <Tabs>
              <div className="container">
                <div className="resume-content">
                  <div className="content-left">
                    <h1>Why hire me?</h1>
                    <p>
                      There is some information about my studies belong to this
                      field
                    </p>
                    <div className="content-left-tab-panel">
                      <TabList>
                        <Tab>Experience</Tab>
                        <Tab>Education</Tab>
                        <Tab>Skills</Tab>
                        <Tab>About me</Tab>
                      </TabList>
                    </div>
                  </div>
                  <div className="content-right">
                    <TabPanel>
                      <h1>My experience</h1>
                      <p>
                        {experience?.map((el)=> el?.description)}
                      </p>
                      <div className="experience-cards">
                        {experience?.map((el, i) => (
                          <Experience {...el} key={i} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <h1>My education</h1>
                      <p>
                        {education?.map((el)=> el?.description.split(".")[0])}
                      </p>
                      <div className="experience-cards">
                        {education?.map((el) => (
                          <Education {...el} key={el._id} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <h1>My skills</h1>
                      <p>
                        {experience?.map((el)=> el?.description)}
                      </p>
                      <div className="skill-cards">
                        {skills?.map((el) => (
                          <Skill {...el} key={el._id} />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <h1>About me</h1>
                      <p>
                        {experience?.map((el)=> el?.description)}
                      </p>
                      <div className="about-content">
                        <div className="content-left">
                          <h3>
                            <span>Full name</span>
                            {data?.firstName} {data?.lastName}
                          </h3>
                          <h3>
                            <span>Experience</span>
                            {experience?.map((el) => el.companyName)}
                          </h3>
                          <h3>
                            <span>Address</span>
                            {data?.address}
                          </h3>
                        </div>
                        <div className="content-right">
                          <h3>
                            <span>Phone</span>
                            {data?.phoneNumber}
                          </h3>
                          <a href={data?.telegram}>
                            <span>Telegram</span>
                            {data?.telegram}
                          </a>
                          {/* <h3>
                            <span>Email</span>asilbekXoliyorov443@gmail.com
                          </h3> */}
                          {/* <h3>
                            <span>Languages</span>Uzbek{" "}
                            <span className="type-lang">(Native)</span> / English{" "}
                            <span className="type-lang">(Intermediate)</span>
                          </h3> */}
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </div>
              </div>
            </Tabs>
          </section>
          <section id="projects">
            <div className="container">
              <h1 className="project-title">My Projects</h1>
              <p className="project-subtitle">
                {portfolios?.map((el) => <span key={el._id} style={{display:"inline-block"}} className="project-subtitle">{el?.name} / </span>)}
              </p>
              <div className="project-cards">
                {portfolios?.map((el) => (
                  <div key={el?._id} className="project-card">
                    <div className="card-overlay">
                      <div className="card-title">
                        <h1>{portfolios?.indexOf(el) + 1}</h1>
                        <h2>{el?.name}</h2>
                      </div>
                      <h3>{el?.description}</h3>
                      <span></span>
                      <div className="links">
                        <a className="project-link link-vercel" href={el?.url}>
                          <IoLogoVercel />
                        </a>
                        <a className="project-link link-github" href={data?.github}>
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    <img src={getImageURL(el?.photo)} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section id="contact">
            <div className="contact-content container">
              <form className="contact-left">
                <h1>Let`s work together</h1>
                <p>
                  Please , fill all of these fields accurately, it is so vital for
                  me.
                </p>
                <div className="input-group">
                  <input type="text" placeholder="Firstname" name="" id="" />
                  <input type="text" placeholder="Lastname" />
                  <input type="Email" placeholder="Email address" />
                  <input type="tel" placeholder="Phone number" />
                </div>
                <select name="service" id="service">
                  {data?.fields?.map((el, i) => (
                    <option key={i}>{el}</option>
                  ))}
                </select>
                <textarea
                  name=""
                  id=""
                  rows="8"
                  placeholder="Web Development"
                ></textarea>
                <button type="submit">Send message</button>
              </form>
              <div className="contact-right">
                <div className="contact-infos">
                  <div className="contact-card">
                    <FaPhoneAlt />
                  </div>
                  <div className="contact-info">
                    <span>Phone</span>
                    <p>{data?.phoneNumber}</p>
                  </div>
                </div>
                <div className="contact-infos">
                  <div className="contact-card">
                    <FaTelegram />
                  </div>
                  <div className="contact-info">
                    <span>Telegram</span>
                    <a href={data?.telegram}>{data?.telegram}</a>
                  </div>
                </div>
                <div className="contact-infos">
                  <div className="contact-card">
                    <FaLocationDot />
                  </div>
                  <div className="contact-info">
                    <span>Address</span>
                    <p>{data?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </> 
      }

    </Fragment>
  );
};

export default ClientPortfolioPage;
