from machine import Pin, ADC, PWM
from utime import sleep

ledVermelho = Pin(16, Pin.OUT)
ledAmarelo = Pin(17, Pin.OUT)
ledVerde = Pin(18, Pin.OUT)

ledVermelho.value(0)
ledAmarelo.value(0)
ledVerde.value(0)

while True:
   #semaforo abriu
    ledVerde.value(1)
    ledVermelho.value(0)
    ledAmarelo.value(0)
    sleep(3)
    
    #semaforo atenção
    ledVerde.value(0)
    ledAmarelo.value(1)
    ledVermelho.value(0)
    sleep(1)
    
    #semaforo fechado
    ledVerde.value(0)
    ledAmarelo.value(0)
    ledVermelho.value(1)
    sleep(2)