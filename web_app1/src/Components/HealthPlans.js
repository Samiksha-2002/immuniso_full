import React, { useState } from 'react';
import addPink from '../Images/addPink.png'
import add from '../Images/add.png'
import tick from '../Images/tick.png';
import download from '../Images/download.png'
import poha from '../Images/poha.jpg'

function HealthPlans() {
  const [selectedMt, setSelectedMt] = useState([2, 3, 4]);

  const handleMt = (mtIndex) => {
    if (selectedMt.includes(mtIndex)) {
      setSelectedMt(selectedMt.filter(index => index !== mtIndex));
    } else {
      setSelectedMt([...selectedMt, mtIndex]);
    }
  };

  const mealTimes = [
    'Wakeup',
    'Pre-Breakfast',
    'Breakfast',
    'Leaving home for office',
    'Morning mid meal',
    'Evening mid-meal 1',
    'Returning home from office',
    'Dinner',
    'Post Dinner',
    'Sleeping',
    'Evening mid-meal 2',
    'Pre Dinner'
  ];

  const [selectedFood, setSelectedFood] = useState();

  const handlefood = (fIndex) => {
    if(selectedFood === fIndex)
    {
      setSelectedFood(-1)
    }else{

      setSelectedFood(fIndex)
    }
  };

  return (
    <div className='healthPlans'>
      <div className="mealTimes">
        <h1>Meal Times</h1>
        {mealTimes.map((time, index) => (
          <div key={index} className={selectedMt.includes(index + 1) ? 'mtClick' : 'mt'} style={{border: selectedFood === index ? "1px solid #F23D76" : "1px solid transparent", backgroundColor: selectedFood === index ? " #FFE5ED" : "white"}} onClick={() => handleMt(index + 1)}>
            <button className={selectedMt.includes(index + 1) ? 'mtBtnClicked' : 'mtBtn'}>
              <img src={selectedMt.includes(index + 1) ? tick : add} alt="add" />
            </button>
            <p>{time}</p>
          </div>
        ))}
      </div>
      <div className="allMeals">
        {/* height = (230 * number of foods + (number of foods - 1)* 15) */}
        <div className="alm"  style={{border: selectedFood === 1 ? "1px solid #F23D76" : "1px solid #404040"}}>
          <div className="almTop" onClick={()=>handlefood(1)}>
              <h1>Pre-Breakfast</h1>
              <button style={{display: selectedFood === 1 ? 'flex' : 'none'}}>
                <img src={addPink} alt="add" /> 
                <p>Add New Food</p>
              </button>
          </div>
          <div className="almAll"  style={{height: selectedFood === 1  ? `${230 * 3 + (3-1) *15}px` : '0px', marginBottom: selectedFood === 1  ? "30px" : "0px"}}>
              <div className="food">
                {/* <img src={} alt="" /> */}
                <img src={poha} alt="poha" className="fImg"/>
                
                <div className="fDesc">
                  <div className="fdHead">
                    <div className='fdh'> 
                      <p>Poha</p>
                      <p>8:00 - 9:00 AM</p>
                    </div>
                    <button className='edit'>Edit</button>
                  </div>
                  <div className="fd">
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt optio voluptatem harum repellat expedita. Tenetur quia provident obcaecati ratione ex, consequuntur consequatur ipsa nihil impedit sunt veniam labore pariatur accusantium quaerat quo sequi deserunt, natus vitae. Dolores omnis aliquid autem? Inventore repellendus, nemo perferendis illum eum deserunt ullam odio distinctio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repellendus quos asperiores reprehenderit quia doloremque quisquam corrupti rem architecto quis nisi tempore delectus, optio necessitatibus quo, animi repellat vitae molestiae, repudiandae porro aut ipsam atque eaque amet? Culpa, libero voluptatum.
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="food">
                {/* <img src={} alt="" /> */}
                <img src={poha} alt="poha" className="fImg"/>
                <div className="fDesc">
                  <div className="fdHead">
                    <div className='fdh'> 
                      <p>Poha</p>
                      <p>8:00 - 9:00 AM</p>
                    </div>
                    <button className='edit'>Edit</button>
                  </div>
                  <div className="fd">
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt optio voluptatem harum repellat expedita. Tenetur quia provident obcaecati ratione ex, consequuntur consequatur ipsa nihil impedit sunt veniam labore pariatur accusantium quaerat quo sequi deserunt, natus vitae. Dolores omnis aliquid autem? Inventore repellendus, nemo perferendis illum eum deserunt ullam odio distinctio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repellendus quos asperiores reprehenderit quia doloremque quisquam corrupti rem architecto quis nisi tempore delectus, optio necessitatibus quo, animi repellat vitae molestiae, repudiandae porro aut ipsam atque eaque amet? Culpa, libero voluptatum.
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="food">
                {/* <img src={} alt="" /> */}
                <img src={poha} alt="poha" className="fImg"/>
                <div className="fDesc">
                  <div className="fdHead">
                    <div className='fdh'> 
                      <p>Poha</p>
                      <p>8:00 - 9:00 AM</p>
                    </div>
                    <button className='edit'>Edit</button>
                  </div>
                  <div className="fd">
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt optio voluptatem harum repellat expedita. Tenetur quia provident obcaecati ratione ex, consequuntur consequatur ipsa nihil impedit sunt veniam labore pariatur accusantium quaerat quo sequi deserunt, natus vitae. Dolores omnis aliquid autem? Inventore repellendus, nemo perferendis illum eum deserunt ullam odio distinctio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repellendus quos asperiores reprehenderit quia doloremque quisquam corrupti rem architecto quis nisi tempore delectus, optio necessitatibus quo, animi repellat vitae molestiae, repudiandae porro aut ipsam atque eaque amet? Culpa, libero voluptatum.
                    </p>
                    
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="alm"  style={{border:selectedFood === 2  ? "1px solid #F23D76" : "1px solid #404040"}}>
          <div className="almTop" onClick={()=>handlefood(2)}>
              <h1>Breakfast</h1>
              <button style={{display: selectedFood === 2 ? 'flex' : 'none'}}>
                <img src={addPink} alt="add" /> 
                <p>Add New Food</p>
              </button>
          </div>
          <div className="almAll"  style={{height: selectedFood === 2 ? `${230 * 1 + (1-1) *15}px` : '0px', marginBottom: selectedFood === 2 ? "30px" : "0px"}}>
              <div className="food">
                {/* <img src={} alt="" /> */}
                <img src={poha} alt="poha" className="fImg"/>
                <div className="fDesc">
                  <div className="fdHead">
                    <div className='fdh'> 
                      <p>Poha</p>
                      <p>8:00 - 9:00 AM</p>
                    </div>
                    <button className='edit'>Edit</button>
                  </div>
                  <div className="fd">
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt optio voluptatem harum repellat expedita. Tenetur quia provident obcaecati ratione ex, consequuntur consequatur ipsa nihil impedit sunt veniam labore pariatur accusantium quaerat quo sequi deserunt, natus vitae. Dolores omnis aliquid autem? Inventore repellendus, nemo perferendis illum eum deserunt ullam odio distinctio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repellendus quos asperiores reprehenderit quia doloremque quisquam corrupti rem architecto quis nisi tempore delectus, optio necessitatibus quo, animi repellat vitae molestiae, repudiandae porro aut ipsam atque eaque amet? Culpa, libero voluptatum.
                    </p>
                    
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="alm"  style={{border: selectedFood === 3 ? "1px solid #F23D76" : "1px solid #404040"}}>
          <div className="almTop" onClick={()=>handlefood(3)}>
              <h1>Leaving home for office</h1>
              <button style={{display: selectedFood === 3 ? 'flex' : 'none'}}>
                <img src={addPink} alt="add" /> 
                <p>Add New Food</p>
              </button>
          </div>
          <div className="almAll"  style={{height: selectedFood === 3 ? `${230 * 2 + (2-1) *15}px` : '0px', marginBottom: selectedFood === 3 ? "30px" : "0px"}}>
              <div className="food">
                {/* <img src={} alt="" /> */}
                <img src={poha} alt="poha" className="fImg"/>
                <div className="fDesc">
                  <div className="fdHead">
                    <div className='fdh'> 
                      <p>Poha</p>
                      <p>8:00 - 9:00 AM</p>
                    </div>
                    <button className='edit'>Edit</button>
                  </div>
                  <div className="fd">
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt optio voluptatem harum repellat expedita. Tenetur quia provident obcaecati ratione ex, consequuntur consequatur ipsa nihil impedit sunt veniam labore pariatur accusantium quaerat quo sequi deserunt, natus vitae. Dolores omnis aliquid autem? Inventore repellendus, nemo perferendis illum eum deserunt ullam odio distinctio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repellendus quos asperiores reprehenderit quia doloremque quisquam corrupti rem architecto quis nisi tempore delectus, optio necessitatibus quo, animi repellat vitae molestiae, repudiandae porro aut ipsam atque eaque amet? Culpa, libero voluptatum.
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="food">
                {/* <img src={} alt="" /> */}
                <img src={poha} alt="poha" className="fImg"/>
                <div className="fDesc">
                  <div className="fdHead">
                    <div className='fdh'> 
                      <p>Poha</p>
                      <p>8:00 - 9:00 AM</p>
                    </div>
                    <button className='edit'>Edit</button>
                  </div>
                  <div className="fd">
                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt optio voluptatem harum repellat expedita. Tenetur quia provident obcaecati ratione ex, consequuntur consequatur ipsa nihil impedit sunt veniam labore pariatur accusantium quaerat quo sequi deserunt, natus vitae. Dolores omnis aliquid autem? Inventore repellendus, nemo perferendis illum eum deserunt ullam odio distinctio Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repellendus quos asperiores reprehenderit quia doloremque quisquam corrupti rem architecto quis nisi tempore delectus, optio necessitatibus quo, animi repellat vitae molestiae, repudiandae porro aut ipsam atque eaque amet? Culpa, libero voluptatum.
                    </p>
                    
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Guidelines  */}
        <div className="guideLines">
            <div className="glHead">
                <h1>Guidelines</h1>
                <button>Edit</button>
            </div>  
            <textarea>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde porro distinctio sunt nobis esse laudantium obcaecati explicabo quia ullam aliquid facere quasi animi amet, culpa odio corporis a! Esse reiciendis iure doloribus voluptatem quis error dolorum laboriosam officiis, magni eveniet aliquam vitae impedit sunt expedita molestias illum aut tempore, a harum voluptas. Praesentium, explicabo distinctio culpa maiores debitis et eligendi numquam inventore alias pariatur. Fugit maxime est vitae omnis sed, maiores laborum, fuga deserunt sunt, labore quaerat eius vero enim officiis! Nulla molestias voluptate recusandae reprehenderit esse eaque soluta, totam aperiam? Fugiat veniam corporis magni numquam nemo dolor accusantium fugit.
            </textarea>
        </div>

        <button className='exportBtn'>
          <img src={download} alt="download" />
          <p>Export PDF Report</p>
        </button>
      </div>
      
    </div>
  );
}

export default HealthPlans;
