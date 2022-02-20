import React from 'react';
import './UrlEntry.css';
const UrlEntry=({onInputChange, onSubmit})=>{
    return (
        <div>
            <p className='f3'>
                {'Enter the URL nad get the faces noticed!'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5 form'>
                    <input className='f4 pa2 ma3  w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-25 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Find Face</button>
                </div>
            </div>
        </div>
    )
}
export default UrlEntry;