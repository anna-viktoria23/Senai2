from machine import Pin, PWM, ADC
from utime import sleep

# Configurações
bot = Pin(19, Pin.IN)  # Usa PULL_DOWN 

ledR = PWM(Pin(18, Pin.OUT))
ledB = PWM(Pin(16, Pin.OUT))

pot = ADC(26)

ledR.freq(1000)
ledB.freq(1000)


modo = 0
ultimo_estado_botao = 0  # Para detectar borda de subida

while True:
    estado_atual_botao = bot.value()
    if estado_atual_botao == 1 and ultimo_estado_botao == 0:
        modo += 1
        sleep(0.2)
        if modo > 1:
            modo = 0
        print (modo)
    
    
    if modo == 0:
        print("Sistema Desligado!!")
        ledB.duty_u16(0)
        ledR.duty_u16(0)

    if modo == 1:
        print("Sistema Ligado!!")
        valor = pot.read_u16()
        ledB.duty_u16(valor)
        print("Luz azul em: ", pot.read_u16())
        ledR.duty_u16(valor - 65535)
        print("Luz vermelha em: ", 65535 - pot.read_u16())
        sleep(0.02)
    
    ultimo_estado_botao = estado_atual_botao
    sleep(0.01)
        