from machine import Pin, PWM
from utime import sleep

led = PWM(Pin(16))
led.freq(1000)

led.duty_u16(0) #define que o numero vá até o maximo, tendo uma melhor precisão e só permite numeros positivos (0 para cima)

while True:
    led.duty_u16(63000)
    sleep(1)
    led.duty_u16(30000)
    sleep(1)
    led.duty_u16(6000)
    sleep(1)
    led.duty_u16(3000)
    sleep(1)
    led.duty_u16(1000)
    sleep(1)
    led.duty_u16(100)
    sleep(1)
    led.duty_u16(0)