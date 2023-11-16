import {React,useState,useEffect} from 'react';
import {useGetCryptosQuery} from "../services/cryptoApi.js";
import millify from "millify"
import {Link} from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import {Card,Col,Row,Input,Skeleton, Typography} from "antd";
let a=true;
const Cryptocurrencies = ({simplified}) => {
  let count=(simplified? 10:60);
 const {data,isFetching}=useGetCryptosQuery(count);
//  useGetCryptosQuery custom hook generated by createApi this function help to access the data inside the state api(state which is created during the api call) which is store in store
 const [cryptos,setcryptos]=useState(undefined);
 const [searchitem,setsearchitem]=useState("");
 const [result,setresult]=useState(false);
 useEffect(()=>{
  const filtereddata=data?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchitem.toLowerCase()))
  // includes returns true if includes("")
  setresult(false);
  setcryptos(filtereddata);
 },[searchitem,data])

//  if(cryptos === undefined && data?.data?.coins!== undefined){
//   setcryptos(data?.data?.coins)
//  }

useEffect(()=>{
  if(cryptos?.length===0){
    count=0;
    setresult(true);
  }
},[cryptos])

  return (
    <div className={(!isFetching)? "truee":"falsse"}>
    {(!simplified)?
      <>
      <Typography.Title level={3}>
        <span className='heading1'>Cryptocurrency Coins</span></Typography.Title>
      <div className='search-crypto'>
        <Input placeholder='Search Cryptocoin' onChange={(e)=> setsearchitem(e.target.value)}></Input>
      </div>
      </>
      :""}
{
  (result)?<Typography.Title level={4}>
    <span className='heading1'>No results</span></Typography.Title>:<Row gutter={[32,32]}>
        {/* gutter means space between the horizontal and vertical */}

        {/* row and col in the antd is use to create the grid like structure/layout */}
        {/* row create the one full row section and col create the one-one section in row */}
          
          {(cryptos===undefined)? <><Skeleton active className='skelthon1' /><Skeleton active className='skelthon1' /><Skeleton active className='skelthon1' /></>:
          cryptos.map((currency)=>{
            return(<Col xs={24} sm={12} lg={6} key={currency.rank} className='crypto-card'>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card title={`${currency.rank} ${currency.name}`}
                 extra={<img className='crypto-image' src={`${currency.iconUrl}`}/>} hoverable>
                  <p> Price: {millify(currency.price)}</p>
                  <p> Market Cap: {millify(currency.marketCap)}</p>
                  <p> Daily Change: {`${millify(currency.change)}%`} </p>
                </Card>
              </Link>
            </Col>)
          })
        }
      </Row> 
}
    </div>
  )
}

export default Cryptocurrencies