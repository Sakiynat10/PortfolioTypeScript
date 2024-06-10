// import { useEffect, useState } from "react";
// import { FaGithub } from "react-icons/fa";
// import { IoLogoVercel } from "react-icons/io5";
// import getImageURL from "../../../utils/get-image-url";

// const Project = ({ description, name, photo, url }) => {
//   const [sum, setSum] = useState("");
//   useEffect(() => {
//     setSum(name);
//   }, [name]);

//   return (
//     <div className="project-card">
//       <div className="card-overlay">
//         <div className="card-title">
//           <h2>{name}</h2>
//         </div>
//         <h3>{description}</h3>
//         <span></span>
//         <div className="links">
//           <a className="project-link link-vercel" href={url}>
//             <IoLogoVercel />
//           </a>
//           <a className="project-link link-github" href={url}>
//             <FaGithub />
//           </a>
//         </div>
//       </div>
//       <img src={getImageURL(photo)} alt="" />
//     </div>
//   );
// };

// export default Project;
