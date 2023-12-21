'use client'
import { useRouter } from "next/navigation";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

const login = () => {
    const router = useRouter()
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [rememberPassword, setRememberPassword] = useState(false);
    const handleBtn = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Remember Password:', rememberPassword);
    
        // Redirect to home page after successful login
        router.push('/');   
    }
        // State to manage the form fields
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [rememberPassword, setRememberPassword] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
    
        // Load saved email and password from local storage on component mount
        useEffect(() => {
            const storedEmail = localStorage.getItem('rememberedEmail');
            const storedPassword = localStorage.getItem('rememberedPassword');
            const storedRememberPassword = localStorage.getItem('rememberPassword');
    
            if (storedEmail && storedRememberPassword === 'true') {
                setEmail(storedEmail);
                setPassword(storedPassword || '');
                setRememberPassword(true);
            }
        }, []);
    
        // Handle form submission
        const handleLogin = () => {
            // Save email and password to local storage if "Remember password" is checked
            if (rememberPassword) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
                localStorage.setItem('rememberPassword', 'true');
            } else {
                // Clear saved data if "Remember password" is unchecked
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
                localStorage.removeItem('rememberPassword');
            }
    
            // Continue with your login logic here
            // ...
    
            // Redirect to home page after successful login
            router.push("/");
        }
    return (
        <Container className="d-flex flex-column align-items-center mt-5" style={{ width: '600px' }}>
            <h1>Đăng Nhập</h1>
            <Form className="mt-3">
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Nhập Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
    
            <Form.Group controlId="password" className="mt-2">
            <Form.Label>Mật khẩu</Form.Label>
            <div className="position-relative">
                <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute end-0 translate-middle-y border-0"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                {showPassword ? 'Ẩn' : 'Hiện'}
                </Button>
            </div>
            </Form.Group>

    
            <Form.Group className="d-flex justify-content-between align-items-center">
                <Form.Check
                type="checkbox"
                label="Ghi nhớ mật khẩu"
                style={{ marginRight: '50px' }}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
                />
                <a href="/forgot-password" style={{ marginLeft: '50px' }}>
                Quên mật khẩu
                </a>
            </Form.Group>
    
            <Button
                variant="success"
                type="button"
                className="w-100 mt-3"
                onClick={handleLogin}
            >
                Đăng nhập
            </Button>
            </Form>
    
            <p className="mt-3">
            Chưa có tài khoản? <strong><a href="/signup">Đăng ký</a></strong>
            </p>
        </Container>
    );
}
export default login;

{/* <div>
<div>
    <Button variant="success">New</Button>
    <button onClick={() =>handleBtn()}>Back Home</button>
</div>
Facebook Page
</div> */}