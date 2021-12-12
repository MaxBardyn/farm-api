import React, { useEffect, useState } from 'react'
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import "./Farm.css"

function App() {
  const [textObj, setTextObj] = useState([]);


  const [sensorId, setSensorId] = useState("dsf")
  const [sensorType, setSensorType ]= useState("fdsf")
  const [timestamp, setTimestamp ]= useState("fdsf")
  const [APIKey, setAPIKey]= useState("^%$#@!")
  const [farmAddress, setFarmAddress] = useState("sdf")
  const [humidity, setHumidity] = useState("sdf")
  const [lightingLevel, setLightingLevel] = useState("dsf")

  const [sensorLocation, setSensorLacation] = useState("fdsf")
  const fetchData = async () => {
    try {
      axios.get('http://b-max.xyz:80/api/').then(res => {
        const data = res.data;
        setTextObj(data);
    })
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [
    textObj
  ]);

  return (
    <>
      <div style={{ margin: "0rem 2rem" }}>
        <div className="header-secret">
          <h2 style={{ textDecoration: "no", cursor: "pointer", display: "flex", margin: "0rem 1rem 0rem 0rem", fontFamily: "'Courier New', Courier, monospace", alignItems: "center" }}>
            <p style={{ color: "black", fontFamily: "'Courier New', Courier, monospace" }}>Cloud labs(Farm)  </p></h2>

        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>


          <div className="create-section-secret" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>
              Адрес ферми
            </span>
            <TextField onChange={(e) => setFarmAddress(e.target.value)} style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />
            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>
              Вологість почви
            </span>
            <TextField onChange={(e) => setHumidity(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />

            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>   Рівень освітлення</span>
            <TextField onChange={(e) => setLightingLevel(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />

            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>  Місце розташування сенсора</span>
            <TextField onChange={(e) => setSensorLacation(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />
           
            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>  Вкажіть час зняття показників</span>
            <TextField onChange={(e) => setTimestamp(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />
           
            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>  Вкажіть ІД сенсора</span>
            <TextField onChange={(e) => setSensorId(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />
           
            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>  Вкажіть тип сенсора</span>
            <TextField onChange={(e) => setSensorType(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />
           
           
            <span style={{ color: "black", fontFamily: "'Courier New', Courier, monospace", fontWeight: "900" }}>  Вкажіть секрет сенсора</span>
            <TextField onChange={(e) => setAPIKey(e.target.value)} multiline="true" style={{ margin: "0rem 0rem 1.5rem 0rem" }} type="text" />
           
            <p

              onClick={() => AddFarm(farmAddress, humidity, lightingLevel, sensorLocation,timestamp,sensorType,sensorId,APIKey)}
              class="link-protocol-secret create_template_button_t-secret btn-background-slide row "
              style={{cursor:'pointer'}}
            >
              <p className="text_decoration" style={{ display: "flex" }}>Зберегти запис</p>
            </p>
          </div>

          <div className="main-section-secret">

            {textObj.map((obj) => (<>

              <div className="element-secret" style={{ display: "flex", margin: "0.5rem", padding: "0.5rem" }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row-reverse", justifyContent: "end" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <img alt="where my img....?" src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" style={{ width: "50px", height: "50px", margin: "0.5rem", }} onClick={() => deleteObj(obj.id.S)} />


                  </div>
                  <div style={{ height: "auto", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <p style={{}}>
                      Час зняття показників: {obj.timestamp.S}
                    </p>
                    <p style={{}}>
                     ІД сенсора: {obj.sensor_id.S}
                    </p>
                    <p style={{}}>
                      Тип сенсора: {obj.sensor_type.S}
                    </p>

                    <p style={{}}>
                      Адрес ферми: {obj.farm_address.S}
                    </p>
                    <p style={{}}>
                      Вологість почви: {obj.humidity.S}
                    </p>
                    <p style={{}}>
                      Рівень освітлення: {obj.lighting_level.S}
                    </p>
                    <p style={{}}>
                      Місце розташування сенсора: {obj.sensor_lacation.S}
                    </p>

                   

                  </div>
                </div>

              </div>

            </>))}
          </div>


        </div>
      </div>
    </>
  )

}
async function  AddFarm(farmAddress, humidity, lightingLevel, sensorLocation,timestamp,sensorType,sensorId,APIKey) {
  const body = {
    farm_address: farmAddress,
    humidity: humidity,
    lighting_level: lightingLevel,
    sensor_lacation: sensorLocation,
    timestamp:timestamp,
    sensor_type:sensorType,
    sensor_id:sensorId,
    SECRETKEY:APIKey
  }
  axios.post(`http://b-max.xyz:5000/farm/`, {body})

}

async function deleteObj(id) {
  axios.delete(`http://b-max.xyz:5000/farm/${id}`)
  
}


export default App
