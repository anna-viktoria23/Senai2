from machine import Pin,PWM,ADC
from utime import sleep

ledBlue= PWM(Pin(16))
ledGreen= PWM(Pin(17))
ledRed= PWM(Pin(18))
pot = ADC(26)
ledRed.freq(1000)

ledRed.duty_u16(0)
ledBlue.duty_u16(0)
ledGreen.duty_u16(0)

while True:
    valor = pot.read_u16() 
    print(valor) 
    ledRed.duty_u16(valor)
    ledBlue.duty_u16(0)
    ledGreen.duty_u16(0)
    porcValor = int((valor * 100) / 65535)
    print(f"Valor porcentagem: {porcValor}%")
    sleep(0.8)