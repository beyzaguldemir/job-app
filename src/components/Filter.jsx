import React, { useEffect, useState } from 'react'
import Select from './Select'
import { sortOpt, statusOpt, typeOpt } from '../constants'
import SubmitButton from './SubmitButton'
import { useDispatch } from 'react-redux'
import { setError, setJobs, setLoading } from '../app/slices/jobSlice'
import api from "../utils/api"

const Filter = () => {
  const dispatch=useDispatch()
  const [text,setText]=useState()
  const [status,setStatus]=useState()
  const [type,setType]=useState()
  const [sort,setSort]=useState()
  const [debouncedText,setDebouncedText]=useState()
// *DEBOUNCE
/*
 * Bir olayın cok sık tetiklemesini önlemek için kullanılır
* Her tusa basıldıgında arama yapmak yerine kullanıcının yazmayı bitirmesini
* bekleyip yalnızca belirli bir süre gectikten sonra arama yapar. Bu performansı arttırır
* ve gereksiz ağ isteklerini veya islem yükünü azaltır
 */
useEffect(()=>{
  if(text===undefined) return;
  // bir sayac yap ve islemi sayac duurunca yap
  const timer=setTimeout(()=>setDebouncedText(text),500)
  // eger süre bitmeden tekrar useEffect calısırsa onceki sayacı iptal eder diğeri baslar
  return ()=>{
    clearTimeout(timer)
  }
},[text])

// Filtreleme veya sıralama ile ilgili bir state degistiğinde api'den güncel verileri al
  useEffect(()=>{
    const sortParam=sort==="a-z" || sort==="z-a" 
    ? "company" 
    : sort === "En Yeni" || sort==="En Eski" 
    ? "date" 
    : undefined;

    const orderParam= sort === "a-z" 
    ? "asc" 
    : sort==="z-a" 
    ? "desc" 
    : sort=== "En Yeni" 
    ? "desc" 
    : sort==="En Eski" 
    ? "asc" 
    : undefined

    const params={
      q: text,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,

      
    }
    
    dispatch(setLoading());

    api.get("/jobs",{params}).then((res)=>dispatch(setJobs(res.data))).catch((err)=>dispatch(setError(err.message)))
  },[debouncedText,sort,type,status])


  // filtreyi sıfırla butonuna bastıgımızda stateleri ve inputları sıfırlar
  const handleReset=(e)=>{
    e.preventDefault();
    // state leri sifirla
    setText();
    setSort();
    setStatus();
    setType();
    setDebouncedText();
    // inputları sıfırla
    e.target.reset();
  }
  return (
    <div className='filter-sec'>
        <h2>Filtreleme Formu</h2>
        <form onSubmit={handleReset}> 
            <div>
                <label>Ara</label>
                <input type="text" onChange={(e)=>setText(e.target.value)} />
            </div>
            <Select label="Durum" options={statusOpt} handleChange={(e)=>setStatus(e.target.value)} />
            <Select label={"Tür"} options={typeOpt} handleChange={(e)=>setType(e.target.value)}/>
            <Select label={"Sırala"} options={sortOpt} handleChange={(e)=>setSort(e.target.value)}/>
            <div>
                <SubmitButton text={"Filtreleri Sıfırla"}/>
            </div>
        </form>
    </div>
  )
}

export default Filter


