import React, { useState } from 'react'
import '../styling/pwgen.css'
import { Button, Checkbox, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

function PWGEN() {
  const [length] = useState(15);
  const [password, setPassword] = useState('');
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  function generatePassword() {
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "~!@#$%^&*()_+{}:;',./<>?[]-";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  }

  function copyPassword() {
    if (password) {
      navigator.clipboard.writeText(password);
      setPassword('Password copied to clipboard!')

      setTimeout(() => {
        setPassword(password);
      }, 1500);
    }
  }


  return (
    <>
    <Link to='/'>
      <Button type='text' className='back-home'><HomeOutlined /> Home</Button>
    </Link>

    <div className='container'>
      <Typography.Title className='title'>
        PW-Gen
      </Typography.Title>
      <Typography.Title level={5} className='title'>
        This will generate '15 digit secure password'
      </Typography.Title>

      {password.length > 0 ?
      <>
      <Button className='password-field btn' id="clipboard" title="Click to copy password" onClick={copyPassword}>
        <span id='password'>{password}</span>
      </Button>
      </>
      : ''}

      <div className='options'>
        <div className='option'>
          <Checkbox id='uppercase' onChange={(e) => setUseUppercase(e.target.checked)} checked={useUppercase}>Uppercase (A-Z)</Checkbox>
        </div>
        <div className='option'>
          <Checkbox id='lowercase' onChange={(e) => setUseLowercase(e.target.checked)} checked={useLowercase}>Lowercase (a-z)</Checkbox>
        </div>
        <div className='option'>
          <Checkbox id='numbers' onChange={(e) => setUseNumbers(e.target.checked)} checked={useNumbers}>Numbers (0-9)</Checkbox>
        </div>
        <div className='option'>
          <Checkbox id='symbols' onChange={(e) => setUseSymbols(e.target.checked)} checked={useSymbols}>Symbols (!@#& etc.)</Checkbox>
        </div>
      </div>
      <div className="generatepassword">
          <Button type='primary' className='btn' id='generate' onClick={generatePassword}>Generate Password</Button>
      </div>
    </div>
    </>
  );
}

export default PWGEN;