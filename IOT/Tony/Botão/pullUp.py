from machine import Pin
from utime import sleep

#declarar a variavel
botaoUp = Pin(15, Pin.IN)

#comrçando os comando
while True:
    #lendo o botão, ver se está 0 ou 1
    leituraBotao = botaoUp.value()
    
    #ver a informação.
    if leituraBotao == 0:
        print("botão foi pressionado!! (estado: LOW)")
        print(leituraBotao)
    else:
        print("botão NÃO foi pressionado! (estado: HIGH)")
        print(leituraBotao)
    
    sleep(0.5)