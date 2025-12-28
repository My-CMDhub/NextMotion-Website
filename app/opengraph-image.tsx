import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SolarSaver - Maximize Your Solar Savings';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0a0a0a, #111)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Accents */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        background: '#ff5722',
                        opacity: 0.1,
                        filter: 'blur(100px)',
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-100px',
                        width: '500px',
                        height: '500px',
                        background: '#ff8a50',
                        opacity: 0.05,
                        filter: 'blur(120px)',
                        borderRadius: '50%',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: '60px 80px',
                        background: 'rgba(255,255,255,0.03)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                background: '#ff5722',
                                borderRadius: '50%',
                                marginRight: '12px',
                                boxShadow: '0 0 20px rgba(255,87,34,0.5)'
                            }}
                        />
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            SolarSaver
                        </span>
                    </div>

                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: 1.1,
                            marginBottom: '20px',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            backgroundImage: 'linear-gradient(to bottom, #ffffff, #aaaaaa)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Stop Wasting<br />Your Solar
                    </div>

                    <div
                        style={{
                            fontSize: 28,
                            color: '#ff5722',
                            marginTop: '10px',
                            background: 'rgba(255, 87, 34, 0.1)',
                            padding: '10px 24px',
                            borderRadius: '100px',
                            border: '1px solid rgba(255, 87, 34, 0.2)',
                        }}
                    >
                        Premium Next.js + Framer Motion Template
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
