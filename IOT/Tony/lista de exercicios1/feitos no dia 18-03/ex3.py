from machine import Pin,PWM,ADC
from utime import sleep

led = PWM(Pin(16))
pot = ADC(26)
led.freq(1000)

while True:
    valor = pot.read_u16() 
    print(valor) 
    led.duty_u16(valor)
    porcValor = int((valor * 100) / 65535)
    print(f"Valor porcentagem: {porcValor}%")
    sleep(0.8)
