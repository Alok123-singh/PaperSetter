import React,{ useId } from 'react';
import { Controller, useForm, useFormState  } from 'react-hook-form';
import { Input1, Button1, Logo } from '../../index';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


function OverlayForm2({ onClose, onSubmit, formData }) {
    const { register, handleSubmit, watch, control, formState } = useForm();
    const { errors } = formState;
    const id = useId();

    const addCourse = (data) => {
        onSubmit(data);
        onClose();
    };

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal-overlay2')) {
          onClose();
        }
    };

    const renderInput = (props, openCalendar, closeCalendar) => {
        return (
          <input
            {...props}
            value={props.value ? new Date(props.value).toLocaleString() : ''}
            readOnly
            onClick={openCalendar}
          />
        );
    };

    return (
        <div className={`fixed cursor-default top-0 left-0 w-[100%] h-[100%] flex  items-center modal-overlay2 bg-black bg-opacity-50 z-50  ${(formData.formDesign && formData.formDesign.start) ? formData.formDesign.start : 'justify-center'} `} style={{backgroundColor : 'rgba(0, 0, 0, 0.5)'}}  onClick={handleClickOutside}>
            <div className={`relative overflow-y-auto max-h-[95%] w-[95%] md:w-3/4 lg:w-1/2 ${formData.formWidth && formData.formWidth} ${formData.formHeight && formData.formHeight}  bg-white p-[20px] rounded-md z-1001`}>
                <div className='space-y-1 mb-4 text-sm'>
                    <p className='pl-1 text-2xl font-bold'>{formData.title}</p>
                    <p className='pl-1'>{formData.desc}</p>
                    <div className='bg-pink-400 h-[1px]'></div>
                </div>

                <form
                onSubmit={handleSubmit(addCourse)}
                className=" w-full flex flex-col justify-center items-center "
                >
                    <div className={`grid md:grid-cols-${(formData.formDesign && formData.formDesign.cols) ? formData.formDesign.cols : 2} gap-8 w-full`}>
                        {formData.inputs.map((input, index) => {

                                if(input.type.includes('dateAndTime')){
                                    return  <div key={index} className='w-full h-full flex flex-col justify-start items-start'>
                                                {input.label && (
                                                    <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                                                        <div className=''>
                                                            {input.label}
                            
                                                        </div>
                                                        {input.required && 
                                                            <p className='text-red-400 mb-3 ml-1'>
                                                                *
                                                            </p>
                                                        }
                                                    </label>
                                                )}
                                                {input.type === 'dateAndTime1' && // Datetime calender
                                                    <Controller
                                                        name={input.name}
                                                        control={control}
                                                        defaultValue={input.defaultValue || null}
                                                        rules={{ required: input.required }}
                                                        render={({ field }) => (
                                                            <Datetime
                                                                {...field}
                                                                inputProps={{
                                                                    className: `h-[3.55rem] w-full px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-400 placeholder:text-gray-500`,
                                                                }}
                                                                className='w-full h-full'
                                                                // renderInput={renderInput}
                                                                viewMode="time"
                                                            />
                                                        )}
                                                        id={id}
                                                    />
                                                }
                                                {input.type === 'dateAndTime2' && // Flatpickr calender
                                                    <Controller
                                                        name={input.name}
                                                        control={control}
                                                        defaultValue={input.defaultValue || null}
                                                        rules={{ required: input.required }}
                                                        render={({ field }) => (
                                                            <Flatpickr
                                                                {...field}
                                                                options={{
                                                                    dateFormat: input.dateFormat != undefined ? input.dateFormat : 'Y-m-d h:i K',
                                                                    enableTime: input.enableTime !== undefined ? input.enableTime : true,
                                                                    // Add more Flatpickr options as needed
                                                                }}
                                                                className="h-[3.55rem] w-full px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-400 placeholder:text-gray-500"
                                                            />
                                                        )}
                                                        id={id}
                                                    /> 
                                                }
                                                {input.type === 'dateAndTime3' && // DatePicker calender
                                                    <Controller
                                                        name={input.name}
                                                        control={control}
                                                        defaultValue={input.defaultValue || null}
                                                        rules={{ required: input.required }}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                {...field}
                                                                selected={field.value ? moment(field.value).toDate() : null}
                                                                showTimeSelect={input.enableTime !== undefined ? input.enableTime : true}

                                                                timeFormat="HH:mm"
                                                                timeIntervals={15}
                                                                dateFormat={input.dateFormat != undefined ? input.dateFormat : "MMMM d, yyyy h:mm aa"}  
                                                                className='w-[18rem] px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-400 placeholder:text-gray-500'
                                                            />
                                                        )}
                                                        id={id}
                                                    /> 
                                                }
                                            </div>
                                }

                                if(input.type === 'select'){
                                    return <div key={index} className='w-full h-full flex flex-col justify-start items-start'>
                                                {input.label && (
                                                    <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                                                        <div className=''>
                                                            {input.label}
                            
                                                        </div>
                                                        {input.required && 
                                                            <p className='text-red-400 mb-3 ml-1'>
                                                                *
                                                            </p>
                                                        }
                                                    </label>
                                                )}
                                                <Controller
                                                    
                                                    name={input.name}
                                                    control={control}
                                                    defaultValue={input.defaultValue || null}
                                                    rules={{
                                                        validate: (value) => {
                                                            if (input.required && (value === '' || value === input.placeholder)) {
                                                                return 'Please select an option';
                                                            }
                                                            
                                                            return true;
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <div className='w-full flex flex-col justify-center items-start'>
                                                            <select
                                                                {...field}
                                                                className="w-full h-[3.55rem] appearance-none bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                                                            >
                                                                {/* Placeholder option */}
                                                                {input.placeholder && 
                                                                    <option value={input.placeholder}>
                                                                        {input.placeholder}
                                                                    </option>
                                                                }
                                                                
                                                                {input.options.map((option,index) => (
                                                                    <option key={index} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors[input.name] && (
                                                                <p className="text-red-500 mt-3">{errors[input.name].message}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                }

                                if(input.type === 'checkbox'){
                                    return <div key={index} className='w-full h-full flex flex-col justify-start items-start'>
                                        {input.label && (
                                            <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                                                <div className=''>
                                                    {input.label}
                    
                                                </div>
                                                {input.required && 
                                                    <p className='text-red-400 mb-3 ml-1'>
                                                        *
                                                    </p>
                                                }
                                            </label>
                                        )}
                                        <Controller
                                            name={input.name}
                                            control={control}
                                            defaultValue={input.defaultValue || null}
                                            rules={{ required: input.required }}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    {input.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                id={`${optionIndex}`}
                                                                value={option}
                                                                {...field}
                                                                defaultChecked={option === parentData[input.defaultValue] ? true : false}
                                                                className="appearance-none border border-gray-400 rounded-full h-5 w-5 checked:bg-blue-500 checked:border-transparent focus:outline-none"
                                                            />
                                                            <label
                                                                htmlFor={`${optionIndex}`}
                                                                className="ml-2 text-gray-700"
                                                            >
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>
                                }

                                if(input.type === 'radio'){
                                    return <div key={index} className='w-full h-full flex flex-col justify-start items-start'>
                                        {input.label && (
                                            <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                                                <div className=''>
                                                    {input.label}
                    
                                                </div>
                                                {input.required && 
                                                    <p className='text-red-400 mb-3 ml-1'>
                                                        *
                                                    </p>
                                                }
                                            </label>
                                        )}
                                        <Controller
                                            name={input.name}
                                            control={control}
                                            defaultValue={input.defaultValue || null}
                                            rules={{ required: input.required }}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-2">
                                                    {input.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id={`${optionIndex}`}
                                                                value={option}
                                                                {...field}
                                                                defaultChecked={option === parentData[input.defaultValue] ? true : false}
                                                                className="appearance-none border border-gray-400 rounded-full h-5 w-5 checked:bg-blue-500 checked:border-transparent focus:outline-none"
                                                            />
                                                            <label
                                                                htmlFor={`${optionIndex}`}
                                                                className="ml-2 text-gray-700"
                                                            >
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>
                                
                                }

                                if (input.type === 'textarea') {
                                    return (
                                        <div key={index} className='w-full h-full flex flex-col justify-start items-start'>
                                            {input.label && (
                                                <label className='mb-1 pl-1 flex justify-start items-center font-semibold' htmlFor={id}>
                                                    <div className=''>
                                                        {input.label}
                        
                                                    </div>
                                                    {input.required && 
                                                        <p className='text-red-400 mb-3 ml-1'>
                                                            *
                                                        </p>
                                                    }
                                                </label>
                                            )}
                                            <Controller
                                                name={input.name}
                                                control={control}
                                                defaultValue={input.defaultValue || ''}
                                                rules={{ required: input.required }}
                                                render={({ field }) => (
                                                    <div className="w-full flex flex-col">
                                                        <textarea
                                                            id={id}
                                                            {...field}
                                                            className="wfull h-[3.55rem] border border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500"
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    );
                                }
                                
                                if(input.defaultValue !== undefined)
                                    return  <Input1
                                                key={index}
                                                label={input.label}
                                                type={input.type}
                                                className='cursor-pointer'
                                                required={input.required}
                                                defaultValue={input.defaultValue || null}
                                                placeholder={input.placeholder}
                                                name={input.name}
                                                readOnly={input.readOnly || false}
                                                {...register(input.name, { required: input.required })}
                                            />

                                return <Input1
                                    key={index}
                                    label={input.label}
                                    type={input.type}
                                    className='cursor-pointer'
                                    required={input.required}
                                    placeholder={input.placeholder}
                                    name={input.name}
                                    readOnly={input.readOnly || false}
                                    {...register(input.name, { required: input.required })}
                                />
                            }
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 place-items-center w-full mt-4">
                        {formData.buttons.map((button, index) => (
                            <div key={index} className={`${button.style && button.style} mt-4`}>
                                <Button1 type={button.type} className={button.style}>
                                    {button.text}
                                </Button1>
                            </div>
                        ))}
                    </div>

                </form>
                
            </div>
        </div>
    );
}

export default OverlayForm2
