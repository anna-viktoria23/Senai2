from machine import Pin
from utime import sleep

#declarar a variavel
botaoDown = Pin(16, Pin.IN)
ledRed = Pin(17, Pin.OUT)

#comrçando os comando
while True:
    #lendo o botão, ver se está 0 ou 1
    leituraBotao = botaoDown.value()
    
    #ver a informação.
    if leituraBotao == 1:
        ledRed.value(1)
        print("botão foi pressionado!! (estado: high)")
        print(leituraBotao)
    else:
        ledRed.value(0)
        print("botão NÃO foi pressionado! (estado: low)")
        print(leituraBotao)
    
    sleep(0.5)