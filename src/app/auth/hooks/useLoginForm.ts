// 'use client';

// import { useState, useCallback } from 'react';
// import { useAuth } from '@/core/auth/useAuth';

// export function useLoginForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     const { login } = useAuth();

//     const handleSubmit = useCallback(
//         async (e: React.FormEvent) => {
//             e.preventDefault();
//             setError(null);
//             setLoading(true);

//             login(email, password)

//             setLoading(false);
//         },
//         [email, password, login]
//     );

//     const resetForm = useCallback(() => {
//         setEmail('');
//         setPassword('');
//         setError(null);
//     }, []);

//     return {
//         email,
//         setEmail,
//         password,
//         setPassword,
//         error,
//         loading,
//         handleSubmit,
//         resetForm,
//     };
// }
