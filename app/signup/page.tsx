'use client'
import { useRouter } from "next/navigation";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

const signup = () => {
    const router = useRouter()
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [rememberPassword, setRememberPassword] = useState(false);
    const handleBtn = () => {
        console.log('Email:', email);
        console.log('Password:', password);
    
        // Redirect to home page after successful login
        router.push('/');   
    }
        // State to manage the form fields
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [password2, setPassword2] = useState('');
        const [acceptRules, setAcceptRules] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const [showPassword2, setShowPassword2] = useState(false);
    return (
        <Container fluid className="d-flex flex-column align-items-center mt-5" style={{ width: '800px' }}>
            <h1>Đăng Ký Tài Khoản</h1>
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

            <Form.Group controlId="password2" className="mt-2">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <div className="position-relative">
                <Form.Control
                type={showPassword2 ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                />
                <Button
                variant="outline-secondary"
                onClick={() => setShowPassword2(!showPassword2)}
                className="position-absolute end-0 translate-middle-y border-0"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                {showPassword2 ? 'Ẩn' : 'Hiện'}
                </Button>
            </div>
            </Form.Group>

    
            <Form.Group className="d-flex justify-content-between align-items-center">
            <Form.Check
                type="checkbox"
                label={
                <span>
                    Chấp nhận các <a href="/rules">Điều khoản</a>
                </span>
                }
                style={{ marginRight: '200px' }}
                checked={acceptRules}
                onChange={() => setAcceptRules(!acceptRules)}
            />
            </Form.Group>

    
            <Button
                variant="success"
                type="button"
                className="w-100 mt-3"
                onClick={handleBtn}
            >
                Đăng ký
            </Button>
            </Form>
    
            <p className="mt-3">
            Đã có tài khoản? <strong><a href="/login">Đăng nhập</a></strong>
            </p>
        </Container>
    );
}
export default signup;

{/* <div>
<div>
    <Button variant="success">New</Button>
    <button onClick={() =>handleBtn()}>Back Home</button>
</div>
Facebook Page
</div> */}