from machine import Pin,PWM,ADC
from utime import sleep

ledBlue= PWM(Pin(16))
ledGreen= PWM(Pin(17))
ledRed= PWM(Pin(18))
pot = ADC(26)
botao= Pin(19, Pin.IN)
ledRed.freq(1000)

ledRed.freq(1000)
ledBlue.freq(1000)
ledGreen.freq(1000)

ledRed.duty_u16(0)
ledBlue.duty_u16(0)
ledGreen.duty_u16(0)

modo = 0
ultimo_estado_botao = 0

while True:
    estado_atual_botao = botao.value()

    if estado_atual_botao == 1 and ultimo_estado_botao == 0:
        modo += 1
        sleep(0.2)
        if modo > 2:
            modo = 0
        print (modo)
    
    if modo == 0:
        valor = pot.read_u16()
        ledBlue.duty_u16(0)
        ledGreen.duty_u16(0)
        ledRed.duty_u16(valor)
    
    if modo == 1:
        valor = pot.read_u16()
        ledBlue.duty_u16(valor)
        ledRed.duty_u16(0)
        ledGreen.duty_u16(0)
    
    if modo == 2:
        valor = pot.read_u16()
        ledGreen.duty_u16(valor)
        ledRed.duty_u16(0)
        ledBlue.duty_u16(0)
        
    ultimo_estado_botao = estado_atual_botao
    sleep(0.01)
    