from machine import Pin, PWM
from utime import sleep

led = PWM(Pin(16))
bot1= Pin(17, Pin.IN) #aumenta brilho #ambos em DOWN
bot2= Pin(18, Pin.IN) #diminui brilho

led.freq(1000)
led.duty_u16(1)

brilho_atual = 0
brilho = 65535

while True:
    print(bot1.value())
    print(bot2.value())
    sleep(0.5)
    if bot1.value() == 1:
        brilho_atual += brilho
        if brilho_atual > 65535:
            brilho_atual = 65535
            led.duty_u16(brilho_atual)
            sleep(0.2)
        
    if bot2.value() == 1:
        brilho_atual -= brilho
        if brilho_atual < 0:
            brilho_atual = 0
            led.duty_u16(brilho_atual)
            sleep(0.2)
        