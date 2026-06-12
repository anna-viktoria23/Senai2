from machine import Pin, PWM, ADC
from utime import sleep

ledR = PWM(Pin(16, Pin.OUT))
ledG = PWM(Pin(17, Pin.OUT))
ledB = PWM(Pin(18, Pin.OUT))

pot = ADC(26)

ledR.freq(1000)
ledG.freq(1000)
ledB.freq(1000)

while True:
    valor = pot.read_u16()
    conta = 65535 - valor
    print(pot.read_u16())
    
    ledB.duty_u16(valor)
    
    ledR.duty_u16(conta)
    sleep(0.2)
    