import React,{ useId, useState, useEffect } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { Input1, Button1 } from '../../index';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


function OverlayForm1({ onClose, onSubmit, formData, parentData }) {

    const { register, handleSubmit, watch, control, formState, setValue } = useForm();
    const { errors } = formState;
    const id = useId();

    const [dependencies, setDependencies] = useState(() => {
        let array = [];
        
        formData.inputs.map((input) => {
            if(input.autoGenerationPolicy){
                array.push(watch(input.autoGenerationPolicy.sourceField));
            }
        });

        return array;
    });

    const addCourse = (data) => {
        onSubmit(data);
        onClose();
    };

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
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

     // Generic function to handle auto-generation based on policy
     const generateValue = (field) => {
        if (field.autoGenerationPolicy) {
            const { sourceField, generationFunction } = field.autoGenerationPolicy;
            const sourceValue = watch(sourceField); // Assuming watch is available
            const generatedValue = generationFunction(sourceValue);
            setValue(field.name, generatedValue);
            // console.log("Auto generation run");
        }
    };


    useEffect(() => {
        // console.log("Inside useEffect");
        formData.inputs.forEach((field) => generateValue(field));

    }, [ [...dependencies] ]);

    return (
        <div className=" fixed cursor-default top-0 left-0 w-[100%] h-[100%] flex justify-center items-center z-1000 modal-overlay bg-black bg-opacity-50 z-50" style={{backgroundColor : 'rgba(0, 0, 0, 0.5)'}} onClick={handleClickOutside}>
            <div className={` relative overflow-y-auto w-[95%] md:w-3/4 lg:w-1/2 ${formData.formWidth && formData.formWidth} ${formData.formHeight && formData.formHeight}  bg-white p-[20px] rounded-md z-1001`}>
                <div className='space-y-1 mb-4 text-sm'>
                    <p className='pl-1 font-bold'>{formData.title}</p>
                    <p className='pl-1'>{formData.desc}</p>
                    <div className='bg-pink-400 h-[1px]'></div>
                </div>

                {/* Errors Section */}
                <div className='w-full mb-4 flex flex-col justify-center items-center'>
                    {(formData.errors && formData.errors.length > 0) && <div className='flex flex-col'>
                        {
                            formData.errors.map((err,index) => 
                            (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                        }
                    </div>}
                </div>

                <form
                onSubmit={handleSubmit(addCourse)}
                className=" w-full flex flex-col justify-center items-center "
                >
                    <div className="grid md:grid-cols-2 gap-4 w-full">
                        {formData.inputs.map((input, index) => {

                                if(input.type.includes('dateAndTime')){
                                    return  <div key={index} className='w-full h-full flex flex-col justify-start items-start'>
                                                {input.label && (
                                                    <label className='mb-1 pl-1 flex justify-start items-center' htmlFor={id}>
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
                                                        defaultValue={parentData[input.defaultValue] || null}
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
                                                        defaultValue={parentData[input.defaultValue] || null}
                                                        rules={{ required: input.required }}
                                                        render={({ field }) => (
                                                            <Flatpickr
                                                                {...field}
                                                                options={{
                                                                    dateFormat: 'Y-m-d h:i K',
                                                                    enableTime: true,
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
                                                        defaultValue={parentData[input.defaultValue] || null}
                                                        rules={{ required: input.required }}
                                                        render={({ field }) => (
                                                            <DatePicker
                                                                {...field}
                                                                selected={field.value ? moment(field.value).toDate() : null}
                                                                showTimeSelect
                                                                timeFormat="HH:mm"
                                                                timeIntervals={15}
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                className='w-[18rem] overflow-y-auto px-3 py-4 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-400 placeholder:text-gray-500'
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
                                                    <label className='mb-1 pl-1 flex justify-start items-center' htmlFor={id}>
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
                                                                    <option key={index} value={input.accessFieldName ? option[input.accessFieldName] : option}>
                                                                        {input.accessFieldName ? option[input.accessFieldName] : option}
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
                                            <label className='mb-1 pl-1 flex justify-start items-center' htmlFor={id}>
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
                                            defaultValue={parentData[input.defaultValue] || null}
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
                                            <label className='mb-1 pl-1 flex justify-start items-center' htmlFor={id}>
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
                                            defaultValue={parentData[input.defaultValue] || null}
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
                                                <label className='mb-1 pl-1 flex justify-start items-center' htmlFor={id}>
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
                                                defaultValue={parentData[input.defaultValue] || null}
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
                                                defaultValue={parentData[input.defaultValue]}
                                                placeholder={input.placeholder}
                                                name={input.name}
                                                readOnly={input.readOnly || false}
                                                // disabled={input.disabled}
                                                {...register(input.name, { required: input.required })}
                                            />

                                return <Input1
                                    key={index}
                                    label={input.label}
                                    type={input.type}
                                    required={input.required}
                                    className='cursor-pointer'
                                    placeholder={input.placeholder}
                                    name={input.name}
                                    readOnly={input.readOnly || false}
                                    // disabled={input.disabled}
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

export default OverlayForm1;
