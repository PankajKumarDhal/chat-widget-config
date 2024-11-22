import React from "react";

function ConfigForm({ config, onConfigChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onConfigChange({ [name]: value });
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onConfigChange({ [name]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        padding: "20px",
        background: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Roboto', sans-serif",
        // margin: "auto",
        height: "auto", // Automatically adjust height
      }}
    >
      <button
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          background: "#343a40",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Load Config
      </button>

      {[
        { label: "Config Name:", name: "configName", type: "text" },
        { label: "Bot Name:", name: "botName", type: "text" },
        {
          label: "Font Family:",
          name: "fontFamily",
          type: "select",
          options: [
            { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
            { value: "'Arial', sans-serif", label: "Arial" },
            { value: "'Roboto', sans-serif", label: "Roboto" },
          ],
        },
        { label: "Header Color:", name: "headerColor", type: "color" },
        { label: "Header Font Color:", name: "headerFontColor", type: "color" },
        { label: "Background Color:", name: "backgroundColor", type: "color" },
        { label: "Chat Font Color:", name: "chatFontColor", type: "color" },
      ].map((field, index) => (
        <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
          <label
            style={{
              flex: "1",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#495057",
              marginRight: "10px",
            }}
          >
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={config[field.name]}
              onChange={handleInputChange}
              style={{
                flex: "2",
                padding: "6px",
                border: "1px solid #ced4da",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              {field.options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <div style={{ position: "relative", flex: "2", display: "flex", alignItems: "center" }}>
              <input
                type={field.type}
                name={field.name}
                value={config[field.name]}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  border: "1px solid #ced4da",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              {field.type === "color" && (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: config[field.name],
                    marginLeft: "10px",
                    border: "1px solid #ced4da",
                  }}
                ></div>
              )}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginBottom: "10px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#495057",
          }}
        >
          Avatar Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "avatarImage")}
          style={{
            width: "100%",
            padding: "6px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#495057",
          }}
        >
          Launcher Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "launcherImage")}
          style={{
            width: "100%",
            padding: "6px",
            border: "1px solid #ced4da",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        />
      </div>

      <button
        onClick={() => {
          const blob = new Blob([JSON.stringify(config)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${config.configName}.json`;
          link.click();
        }}
        style={{
          padding: "10px",
          width: "100%",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
      >
        Download Config
      </button>
    </div>
  );
}

export default ConfigForm;





// import React from "react";

// function ConfigForm({ config, onConfigChange }) {
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     onConfigChange({ [name]: value });
//   };

//   const handleFileChange = (e, name) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => onConfigChange({ [name]: reader.result });
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "40%",
//         padding: "20px",
//         background: "#f8f9fa",
//         borderRadius: "12px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         fontFamily: "'Roboto', sans-serif",
//         margin: "auto",
//         height: "fit-content", // Automatically adjust height
//       }}
//     >
//       <button
//         style={{
//           marginBottom: "20px",
//           padding: "10px",
//           width: "100%",
//           background: "#343a40",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           fontWeight: "bold",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         Load Config
//       </button>

//       {[
//         { label: "Config Name:", name: "configName", type: "text" },
//         { label: "Bot Name:", name: "botName", type: "text" },
//         {
//           label: "Font Family:",
//           name: "fontFamily",
//           type: "select",
//           options: [
//             { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
//             { value: "'Arial', sans-serif", label: "Arial" },
//             { value: "'Roboto', sans-serif", label: "Roboto" },
//           ],
//         },
//         { label: "Header Color:", name: "headerColor", type: "color" },
//         { label: "Header Font Color:", name: "headerFontColor", type: "color" },
//         { label: "Background Color:", name: "backgroundColor", type: "color" },
//         { label: "Chat Font Color:", name: "chatFontColor", type: "color" },
//       ].map((field, index) => (
//         <div key={index} style={{ marginBottom: "15px", position: "relative" }}>
//           <label
//             style={{
//               display: "block",
//               marginBottom: "5px",
//               fontWeight: "bold",
//               fontSize: "14px",
//               color: "#495057",
//             }}
//           >
//             {field.label}
//           </label>
//           {field.type === "select" ? (
//             <select
//               name={field.name}
//               value={config[field.name]}
//               onChange={handleInputChange}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 border: "1px solid #ced4da",
//                 borderRadius: "6px",
//                 fontSize: "14px",
//               }}
//             >
//               {field.options.map((option, i) => (
//                 <option key={i} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 value={config[field.name]}
//                 onChange={handleInputChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px",
//                   border: "1px solid #ced4da",
//                   borderRadius: "6px",
//                   fontSize: "14px",
//                 }}
//               />
//               {field.type === "color" && (
//                 <div
//                   style={{
//                     width: "24px",
//                     height: "24px",
//                     borderRadius: "50%",
//                     backgroundColor: config[field.name],
//                     position: "absolute",
//                     top: "50%",
//                     right: "10px",
//                     transform: "translateY(-50%)",
//                     border: "1px solid #ced4da",
//                   }}
//                 ></div>
//               )}
//             </>
//           )}
//         </div>
//       ))}

//       <div style={{ marginBottom: "15px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Avatar Image:
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleFileChange(e, "avatarImage")}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Launcher Image:
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleFileChange(e, "launcherImage")}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <button
//         onClick={() => {
//           const blob = new Blob([JSON.stringify(config)], {
//             type: "application/json",
//           });
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = `${config.configName}.json`;
//           link.click();
//         }}
//         style={{
//           padding: "10px",
//           width: "100%",
//           background: "#007BFF",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           fontWeight: "bold",
//           fontSize: "16px",
//           cursor: "pointer",
//           transition: "background-color 0.3s",
//         }}
//         onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
//         onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
//       >
//         Download Config
//       </button>
//     </div>
//   );
// }

// export default ConfigForm;






// import React from "react";

// function ConfigForm({ config, onConfigChange }) {
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     onConfigChange({ [name]: value });
//   };

//   const handleFileChange = (e, name) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => onConfigChange({ [name]: reader.result });
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         maxWidth: "400px",
//         padding: "15px",
//         background: "#f8f9fa",
//         borderRadius: "12px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         fontFamily: "'Roboto', sans-serif",
//         margin: "auto",
//       }}
//     >
//       <button
//         style={{
//           marginBottom: "15px",
//           padding: "10px",
//           width: "100%",
//           background: "#343a40",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           fontWeight: "bold",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         Load Config
//       </button>

//       <div style={{ marginBottom: "15px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Config Name:
//         </label>
//         <input
//           type="text"
//           name="configName"
//           value={config.configName}
//           onChange={handleInputChange}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Bot Name:
//         </label>
//         <input
//           type="text"
//           name="botName"
//           value={config.botName}
//           onChange={handleInputChange}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Font Family:
//         </label>
//         <select
//           name="fontFamily"
//           value={config.fontFamily}
//           onChange={handleInputChange}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         >
//           <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
//           <option value="'Arial', sans-serif">Arial</option>
//           <option value="'Roboto', sans-serif">Roboto</option>
//         </select>
//       </div>

//       <div>
//         <h4
//           style={{
//             fontSize: "16px",
//             fontWeight: "bold",
//             color: "#495057",
//             marginBottom: "10px",
//           }}
//         >
//           Customize Colors:
//         </h4>

//         {[
//           { label: "Header Color:", name: "headerColor" },
//           { label: "Header Font Color:", name: "headerFontColor" },
//           { label: "Background Color:", name: "backgroundColor" },
//           { label: "Chat Font Color:", name: "chatFontColor" },
//         ].map((field, index) => (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginBottom: "12px",
//             }}
//           >
//             <label
//               style={{
//                 flex: "1",
//                 fontWeight: "bold",
//                 fontSize: "14px",
//                 color: "#495057",
//               }}
//             >
//               {field.label}
//             </label>
//             <input
//               type="color"
//               name={field.name}
//               value={config[field.name]}
//               onChange={handleInputChange}
//               style={{
//                 flex: "none",
//                 width: "40px",
//                 height: "40px",
//                 border: "none",
//                 background: "none",
//                 marginRight: "10px",
//               }}
//             />
//             <div
//               style={{
//                 flex: "1",
//                 height: "24px",
//                 borderRadius: "12px",
//                 backgroundColor: config[field.name],
//                 border: "1px solid #ced4da",
//               }}
//             ></div>
//           </div>
//         ))}
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Avatar Image:
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleFileChange(e, "avatarImage")}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label
//           style={{
//             display: "block",
//             marginBottom: "5px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             color: "#495057",
//           }}
//         >
//           Launcher Image:
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => handleFileChange(e, "launcherImage")}
//           style={{
//             width: "100%",
//             padding: "6px",
//             border: "1px solid #ced4da",
//             borderRadius: "6px",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <button
//         onClick={() => {
//           const blob = new Blob([JSON.stringify(config)], {
//             type: "application/json",
//           });
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = `${config.configName}.json`;
//           link.click();
//         }}
//         style={{
//           padding: "10px",
//           width: "100%",
//           background: "#007BFF",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           fontWeight: "bold",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         Download Config
//       </button>
//     </div>
//   );
// }

// export default ConfigForm;

