import {NavBar, Space, SearchBar, Tag} from 'antd-mobile'
import { MoreOutline,  AudioFill } from 'antd-mobile-icons'
import React from 'react'
import { Dropdown} from 'antd-mobile'
import { HeartOutline, StarOutline,StarFill} from 'antd-mobile-icons'
import './index.scss'
import {useDispatch, useSelector} from 'react-redux'
import { fetchInfoList } from '../../store/modules/restaurant'
import { useEffect, useState, useRef} from 'react'

const Search = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchInfoList())
    },[dispatch])

    const restaurantList = useSelector(state => state.infoList.infoList)

    useEffect(() => {
        console.log('Restaurant List:', restaurantList);
    }, [restaurantList]);

    const dropdownRef = useRef(null)
    const [selectedCuisine, setSelectedCuisine] = useState(null)
    const handleCuisine = (cuisine) => {
        setSelectedCuisine(cuisine)
        dropdownRef.current?.close()
    }
    /*
        const filteredCuisine = selectedCuisine ? restaurantList.filter(restaurant => restaurant.country === selectedCuisine) : restaurantList;
    */

    const [selectedPrice, setSelectedPrice] = useState('')
    const handlePrice = (price) => {
        setSelectedPrice(price)
        dropdownRef.current?.close()
    }

    const filteredRestaurants = restaurantList.filter(restaurant => {
        const matchesCuisine = selectedCuisine ? restaurant.country === selectedCuisine : true;
        const matchesPrice = selectedPrice ? (restaurant.price >= selectedPrice[0] && restaurant.price <= selectedPrice[1]) : true;
        return matchesCuisine && matchesPrice;
    });
    

    const right = (
        <div style={{ fontSize: 24 }}>
        <Space style={{ '--gap': '16px' }}>
            <AudioFill />
            <MoreOutline />
        </Space>
        </div>
    ) 
    return (  
        <div className='search-page'>
            <div className='header'>
                <div className='nav'>
                <NavBar right={right}>
                    <SearchBar placeholder='' />
                </NavBar>
                </div>
            </div>
            <div className='sort-container'>
                <div className='drop-down'>
                <Dropdown ref={dropdownRef}>
                <Dropdown.Item key='sorter' title='Distance'>
                    <div style={{ padding: 15, color: 'grey'}}>
                        <div>500m</div>
                        <br />
                        <div>1km</div>
                        <br />
                        <div>2km</div>
                        <br />
                        <div>3km</div>
                        <br />
                    </div>
                </Dropdown.Item>
                <Dropdown.Item key='bizop' title='Cuisines'>
                    <div style={{ padding: 15, color: 'grey' }}>
                        <div onClick={() => handleCuisine('French')}>French</div>
                        <br />
                        <div onClick={() => handleCuisine('China')}>China</div>
                        <br />
                        <div onClick={() => handleCuisine('Janpan')}>Janpan</div>
                        <br />
                        <div onClick={() => handleCuisine(null)}>All</div>
                        <br />
                    </div>
                </Dropdown.Item>
                <Dropdown.Item key='more' title='Price'>
                    <div style={{ padding: 15, color: 'grey' }}>
                        <div onClick={() => handlePrice([10, 20])}>€10-20</div>
                        <br />
                        <div onClick={() => handlePrice([20, 30])}>€20-30</div>
                        <br />
                        <div onClick={() => handlePrice([30, 40])}>€30-40</div>
                        <br />
                        <div onClick={() => handlePrice(null)}>All</div>
                        <br />
                    </div>
                </Dropdown.Item>
                </Dropdown>
                </div>
            </div>
            <div className='restaurant-list'>
                <div className='card'  style={{ marginTop:20 }}>
                    {filteredRestaurants && filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((item) => (
                            <div className='card-restaurant' key={item.id}>
                                <div className='image'>
                                    <img src={item.image} alt={item.name} className='restaurant-image'/>
                                </div>
                                <div className='info'>
                                    <div className='row1'>
                                        <div className='name'>{item.name}</div>
                                        <div className='icon'><HeartOutline fontSize={18} /></div>
                                    </div>
                                    <div className='row2'>
                                        <div className='score'>
                                            <StarFill /><StarFill /><StarFill /><StarFill /><StarOutline />
                                             {item.score}
                                        </div>
                                        <div className='review'>
                                            {item.reviews} reviews
                                        </div>
                                    </div>
                                    <div className='row3'>
                                        €€ {item.country} Cuisines
                                    </div>
                                    <div className='row4'>
                                        <Tag round  color='#DCDCDC' style={{ '--text-color': 'var(--adm-color-text)' }} className='tag'>
                                            {item.type1}
                                        </Tag>
                                        <Tag round color='#DCDCDC' style={{ '--text-color': 'var(--adm-color-text)' }} className='tag'>
                                            {item.type2}
                                        </Tag>
                                        <Tag round color='#DCDCDC' style={{ '--text-color': 'var(--adm-color-text)' }} className='tag'>
                                            {item.type3}
                                        </Tag>
                                    </div>
                                </div>
                            </div>
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
                    </div>
                </div>
        </div>  
    )
}

export default Search