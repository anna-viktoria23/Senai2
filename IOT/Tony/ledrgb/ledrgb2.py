from machine import Pin
from utime import sleep

#Declara as variaveis e em que porta estão conectadas
ledRed=  Pin(18, Pin.OUT)
ledGreen=  Pin(17, Pin.OUT)
ledBlue=  Pin(16, Pin.OUT)

#Desligar os led- 1 Liga/ 0 Desliga ou On/Off
ledRed.value(0)
ledBlue.value(0)
ledGreen.value(0)

#começando os comandos
while True:
    #Ligando o vermelho
    ledRed.value(1)
    ledGreen.value(0)
    ledBlue.value(0)
    sleep(0.8)
    
    #ligando o Verde
    ledRed.value(0)
    ledGreen.value(1)
    ledBlue.value(0)
    sleep(0.8)
    
    #Ligando o azul
    ledRed.value(0)
    ledGreen.value(0)
    ledBlue.value(1)
    sleep(0.8)
    
    #cores
    ledRed.value(1)
    ledGreen.value(0)
    ledBlue.value(1)
    sleep(2)
    
    ledRed.value(0)
    ledGreen.value(1)
    ledBlue.value(1)
    sleep(1)
    
    ledRed.value(1)
    ledGreen.value(1)
    ledBlue.value(0)
    sleep(0.8)
    
    ledRed.value(1)
    ledGreen.value(1)
    ledBlue.value(1)
    sleep(2)