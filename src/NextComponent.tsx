
import { useState, useEffect } from 'react';
import axios from 'axios';
import Datamanage from './Datamanage';
import Datastore from './Datastore';
import { useNavigate } from 'react-router-dom';
import { Data } from './data';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


function NextComponent() {
  const [data, setData] = useState<Post[]>([]);
  const navigate=useNavigate();
  

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem('formData')||"");
    console.log("data:"+items)
    if (items.email=="") {
      navigate("/");
    }
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const apiUrl="https://jsonplaceholder.typicode.com/posts";
      const response = await axios.get<Post[]>(apiUrl);
      await setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log("the data is",data);
  return (
      <div className=' flex flex-col m-[30px]'>
        <div className=' font-bold text-4xl w-full text-center underline'>Second Page</div>
        <Datamanage datas={data}/>
        <Datastore groupdata={Data}/>
      </div>
      );
}
export default NextComponent;