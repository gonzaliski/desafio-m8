import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { ThinText } from '../../ui/texts';
import defaultImg from "../../assets/default-image.jpg"
import { MainButton } from '../../ui/buttons';
import css from "./myDropzone.css"
import { FormInput } from '../../components/formInput/FormInput';
export function MyDropzone(props) {
  const {register, name, error,id} = props
  const [selectedImage, setSelectedImage] = useState({} as any)
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      setSelectedImage(
        Object.assign(file,{
          preview:URL.createObjectURL(file)
        })
      )
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        props.upload(binaryStr)
      }
      reader.readAsDataURL(file)
    })
    
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,maxFiles:1})

  return (
    <div >
    <div className={css["container"]} {...getRootProps()}>
      <FormInput {...getInputProps()} {...register("image")} name={name} error={error}/>
      {(selectedImage.preview) ? (

      <div>
      <img src={selectedImage.preview} alt="image" style={{width:"100%"}}></img>
    </div>
    ): (

      <div>
      <img src={defaultImg} alt="image2" style={{width:"100%"}}></img>
      </div>
    )}
      {
        isDragActive ?
        <MainButton>Suelte la imagen aqui</MainButton> :
        <MainButton>Seleccionar imagen</MainButton>
      }
      <ThinText>Selecciona una imagen o arrastrala aqui</ThinText>
    </div>
    
      </div>
  )
}