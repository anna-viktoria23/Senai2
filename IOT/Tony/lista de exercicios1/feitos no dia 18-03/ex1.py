from machine import Pin
from utime import sleep

botao_up = Pin(15, Pin.IN)
led = Pin(17, Pin.OUT )
while True:
    leiturabotao = botao_up.value()  #pegar a informação ligado/desligado
    
    if leiturabotao == 1:
        led.on()
        print("Botão foi pressionado! (Estado: High)")
        print(leitura_botao)
    else:
        led.off()
        print("Botão NÃO foi pressionado! (Estado: LOW)")
        print(leiturabotao)
    sleep(0.5)